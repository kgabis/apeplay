var examples = [
`fn make_person(name) {
    return {
        name: name,
        hello_count: 0,
        greet: fn() {
            println("Hello " + to_str(this.hello_count)
                + ", I'm " + this.name)
            this.hello_count += 1
        },
    }
}
const person = make_person("Mati")
person.greet()
person.greet()`,

`fn fibo(x) {
    if (x == 0) {
        return 0;
    } else if (x == 1) {
        return 1;
    } else {
        return fibo(x - 1) + fibo(x - 2);
    }
}
println(fibo(20));`,
`const err = error("something bad happened")
if (is_error(err)) {
    println(err)
}

fn() {
    // e is a runtime error wrapped in error
    recover (e) {
        return null
    }
    // crashes are recovered with "recover" statement
    crash("something bad happened") 
}()`,
`for (var i = 0; i < 10; i += 1) {
    println("hello " + to_str(i))
}`,
`fn vec2(x, y) {
    return {
        x: x,
        y: y,
        __operator_add__: fn(a, b) { 
            return vec2(a.x + b.x, a.y + b.y)
        },
        __operator_sub__: fn(a, b) { 
            return vec2(a.x - b.x, a.y - b.y)
        },
        __operator_minus__: fn(a) {
            return vec2(-a.x, -a.y) 
        },
        __operator_mul__: fn(a, b) {
            if (is_number(a)) {
                return vec2(b.x * a, b.y * a)
            } else if (is_number(b)) {
                return vec2(a.x * b, a.y * b)
            } else {
                return vec2(a.x * b.x, a.y * b.y)
            }
        },
    }
}
var a = vec2(2, 1)
var b = vec2(10, 13)
var c = a + b
println(to_str(c.x) + " " + to_str(c.y))`,
`fn is_prime(n) {
    var i = 2
    while (i < n) {
        if (n % i == 0) {
            return false
        }
        i += 1
    }
    return true
}

fn nth_prime(n) {
    var candidate = 2
    var count = 0
    while (count < n) {
        if (is_prime(candidate)) {
            count += 1
        }
        candidate += 1
    }
    return candidate - 1
}

const prime = nth_prime(100);
println(prime)`
];