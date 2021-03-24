var examples = {
col0: [
`// Basic operations
var x = 1 // this is a variable
const y = 2 // this is a constant

// if/else if/else
if (x == 1) {
    // branch 1
} else if (x == 2) {
    // branch 2
} else {
    // branch 3
}

// while loop
while (x < 10) {
    x += 1
}

// creating and iterating arrays
var array = [1, 2, 3]
for (item in array) { // foreach
    println(item)
}

// for loop
for (var i = 0; i < len(array); i += 1) {
    // string concatenation
    var str = "number: " + to_str(array[i]) 
    println(str)
}

// creating and iterating maps
var map = {
    "lorem": "ipsum",
    dolor: 2,
    3: false, // numbers can be keys too
    true: 1 // booleans as well
}

println(map.lorem)
println(map["dolor"])

for (kvp in map) {
    print("key: " + to_str(kvp.key) + ", ")
    print("value: " + to_str(kvp.value) + "\\n")
}
`,
`// Recursion
fn fibo(x) {
    if (x == 0) {
        return 0
    } else if (x == 1) {
        return 1
    } else {
        return fibo(x - 1) + fibo(x - 2)
    }
}
println(fibo(20))`,
],
col1: [
`// Functions
// this is a function
var fun = fn() { return 0 }
// this is also a function
fn add2(x) { return x + 2 }

// functions can be passed as values
fn f3(f, a) { return f(a) }
println(f3(add2, 3))
println(f3(fn(x){ return x + 3 }, 2))
`,

`// Creating objects using builtin map type
fn make_person(name) {
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

`// Handling errors
const err = error("something bad happened")
if (is_error(err)) {
    println(err)
}

// crash/recover when something really bad happens
fn() {
    // e is a runtime error wrapped in error
    recover (e) {
        return null
    }
    // crashes are recovered with "recover" statement
    crash("something bad happened") 
}()`,
],
col2: [
`// Operator overloading
fn vec2(x, y) {
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

const prime = nth_prime(100)
println(prime)`
]
};