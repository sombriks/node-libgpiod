{
    "targets": [
        {
            "target_name": "node-libgpiod",
            "conditions": [
                ["OS=='linux'", {
                    "sources": [
                        "src/main.cc",
                        "src/misc.cc",
                        "src/bulk.cc",
                        "src/chip.cc",
                        "src/line.cc"
                    ],
                    "include_dirs": [
                        "<!(node -e \"require('nan')\")"
                    ],
                    "libraries": [
                        "-lgpiod"
                    ],
                    "cflags": [
                        "-O3",
                        "-DGPIOD_VERSION_MAJOR=1",
                        "-DGPIOD_VERSION_MINOR=5"
                    ],
                    "lflags": [
                        "-flto"
                    ]
                }]
            ]
        }
    ],
}
