#include "emscripten.h"
#include "ape.h"

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <string.h>

#define ERROR_BUF_SIZE 2048

static struct {
    ape_t *ape;
    char *ape_out;
    int ape_out_len;
    int ape_out_size;
    char error_buf[ERROR_BUF_SIZE];
} g;

size_t stdout_write(void* context, const void *data, size_t data_size);

EMSCRIPTEN_KEEPALIVE
bool init() {
    if (g.ape) {
        ape_destroy(g.ape);
        g.ape = NULL;
    }
    g.ape = ape_make();
    if (!g.ape) {
        return false;
    }
    ape_set_stdout_write_function(g.ape, stdout_write, NULL);
    return true;
}

EMSCRIPTEN_KEEPALIVE
bool execute(const char *str) {
    ape_execute(g.ape, str);
    if (ape_has_errors(g.ape)) {
        return false;
    }
    return true;
}

EMSCRIPTEN_KEEPALIVE
void clear_stdout() {
    if (g.ape_out) {
        g.ape_out[0] = '\0';
    }
    g.ape_out_len = 0;
}

EMSCRIPTEN_KEEPALIVE
const char* get_stdout() {
    return g.ape_out;
}

EMSCRIPTEN_KEEPALIVE
int get_error_count() {
    return ape_errors_count(g.ape);
}

EMSCRIPTEN_KEEPALIVE
const char* get_error_string_at(int ix) {
    const ape_error_t *err = ape_get_error(g.ape, ix);
    char *err_string = ape_error_serialize(err);
    if ((strlen(err_string) + 1) < ERROR_BUF_SIZE) {
        g.error_buf[0] = '\0';
        strcat(g.error_buf, err_string);
    }
    free(err_string);
    return g.error_buf;
}

size_t stdout_write(void* context, const void *data, size_t data_size) {
    if (g.ape_out_size <= (g.ape_out_len + data_size + 1)) {
        int new_size = (g.ape_out_size + data_size + 1) * 2;
        char *new_buf = malloc(new_size);
        memset(new_buf, 0, new_size);
        if (g.ape_out_len > 0) {
            memcpy(new_buf, g.ape_out, g.ape_out_len + 1);
            free(g.ape_out);
        }
        g.ape_out = new_buf;
        g.ape_out_size = new_size;
    }
    strncat(g.ape_out, data, data_size);
    g.ape_out_len += data_size;
    return data_size;
}