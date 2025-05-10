{
    "targets": [
        {
            "target_name": "node-libgpiod",
            "conditions": [
                ["OS=='linux'", {
                    "sources": [
                        "src/main.cc",
                    ],
                    "include_dirs": [
                        "<!(node -e \"require('nan')\")"
                    ],
                    "libraries": [
                        "-lgpiod"
                    ],
                }]
            ]
        }
    ],
}
