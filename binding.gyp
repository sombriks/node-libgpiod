{
    "targets": [
        {
            "target_name": "node-libgpiod",
            "sources": [ "src/misc.cc", "src/chip.cc", "src/line.cc" ],
            "include_dirs" : [
 	 			"<!(node -e \"require('nan')\")"
			],
            "libraries" : [
                "-lgpiod"
            ]
        }
    ],
}