println("configuring $project")
task("hello") {
    doLast {
        println("hello from other script")
    }
}
