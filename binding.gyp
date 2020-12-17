{
    "targets": [
        {
            "target_name": "NativeExtension",
            "sources": [ "main.cc" ],
            "include_dirs" : [
 	 			"<!(node -e \"require('nan')\")"
			],
            "libraries" : [
                "-lgpiod"
            ]
        }
    ],
}