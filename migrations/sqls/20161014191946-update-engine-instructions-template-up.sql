UPDATE ENGINE_INSPECTION_INSTRUCTIONS_TEMPLATE
SET INSPECTION_INSTRUCTIONS = '{"instructions": [
	{
      "title": "Boroscope Requirements Incoming",
      "basicRequirement": [
        {
          "name": "Fan & Booster",
          "type": "boolean",
          "value": false

        },
        {
          "name": "Combustor",
          "type": "boolean",
          "value": false
        },
        {
          "name": "HPT Nozzle",
          "type": "boolean",
          "value": false
        },
        {
          "name": "HPT",
          "type": "boolean",
          "value": false
        },
        {
          "name": "LPT",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Other",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""

        }
      ],
      "additionalRequirement": [
        {
          "name": "Photos",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Fault",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Full",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Other",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""

        }
      ]
    },
    {
      "title": "Boroscope Requirements Outgoing",
      "basicRequirement": [
        {
          "name": "Fan & Booster",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Combustor",
          "type": "boolean",
          "value": false
        },
        {
          "name": "HPT Nozzle",
          "type": "boolean",
          "value": false
        },
        {
          "name": "HPT",
          "type": "boolean",
          "value": false
        },
        {
          "name": "LPT",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Other",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Comments",
          "value": "",
          "type": "freetext"
        }
      ],
      "additionalRequirement": [
        {
          "name": "Photos",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Fault",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Full",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Other",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""

        }
      ]
    },
    {
      "title": "Health Check Requirements",
      "basicRequirement": [
        {
          "name": "AGB/TGB MCD",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Forward Sump MCD",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Aft Sump MCD",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Scavenge Oil Filter",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Supply Oil Filter",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Fuel Filter",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""

        }
      ]
    },
    {
      "title": "Test Requirements",
      "basicRequirement": [
		{
		  "name": "Testing 000- Engine Assembly Engine Test 000- General",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 001- Engine Assembly- Engine Test 001-Operating Limits",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 002- Engine Assembly- Engine Test 002-Engine Functional Test",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 003- Engine Assembly- Engine Test 003-Engine Acceptance Test",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 004- Engine Assembly- Engine Test 004-Fan Trim Balance",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 005- Engine Assembly- Engine Test 005-Core Trim Balance",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 009- Engine Assembly- Engine Test 009-No.4 Bearing Defect Screening",
		  "type": "boolean",
		  "value": false
		},
        {
          "name": "Engine Oil Type",
          "type": "text",
          "value": ""
		},
        {
          "name": "CIS Fuels",
          "type": "text",
          "value": ""
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""
        }
      ]
    }
  ]}' WHERE ENGINE_FAMILY = 'CFM56' AND ENGINE_MODEL = '3B';

UPDATE ENGINE_INSPECTION_INSTRUCTIONS_TEMPLATE
SET INSPECTION_INSTRUCTIONS = '{"instructions": [
	{
      "title": "Boroscope Requirements Incoming",
      "basicRequirement": [
        {
          "name": "Fan & Booster",
          "type": "boolean",
          "value": false

        },
        {
          "name": "Combustor",
          "type": "boolean",
          "value": false
        },
        {
          "name": "HPT Nozzle",
          "type": "boolean",
          "value": false
        },
        {
          "name": "HPT",
          "type": "boolean",
          "value": false
        },
        {
          "name": "LPT",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Other",
          "value": false
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""

        }
      ],
      "additionalRequirement": [
        {
          "name": "Photos",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Fault",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Full",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Other",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""

        }
      ]
    },
    {
      "title": "Boroscope Requirements Outgoing",
      "basicRequirement": [
        {
          "name": "Fan & Booster",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Combustor",
          "type": "boolean",
          "value": false
        },
        {
          "name": "HPT Nozzle",
          "type": "boolean",
          "value": false
        },
        {
          "name": "HPT",
          "type": "boolean",
          "value": false
        },
        {
          "name": "LPT",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Other",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Comments",
          "value": "",
          "type": "freetext"
        }
      ],
      "additionalRequirement": [
        {
          "name": "Photos",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Fault",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Full",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Video: Other",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""

        }
      ]
    },
    {
      "title": "Health Check Requirements",
      "basicRequirement": [
        {
          "name": "AGB/TGB MCD",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Forward Sump MCD",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Aft Sump MCD",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Scavenge Oil Filter",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Supply Oil Filter",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Fuel Filter",
          "type": "boolean",
          "value": false
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""

        }
      ]
    },
    {
      "title": "Test Requirements",
      "basicRequirement": [
		{
		  "name": "Testing 000- Engine Assembly Engine Test 000- General",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 001- Engine Assembly- Engine Test 001-Operating Limits",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 002- Engine Assembly- Engine Test 002-Engine Functional Test",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 003- Engine Assembly- Engine Test 003-Engine Acceptance Test",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 004- Engine Assembly- Engine Test 004-Fan Trim Balance",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 005- Engine Assembly- Engine Test 005-Core Trim Balance",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 009- Engine Assembly- Engine Test 009-No.4 Bearing Defect Screening",
		  "type": "boolean",
		  "value": false
		},
        {
          "name": "Engine Oil Type",
          "type": "text",
          "value": ""
		},
        {
          "name": "CIS Fuels",
          "type": "text",
          "value": ""
        },
        {
          "name": "Comments",
          "type": "freetext",
          "value": ""
        }
      ]
    }
  ]}' WHERE ENGINE_FAMILY = 'CFM56' AND ENGINE_MODEL = '7B';

UPDATE ENGINE_INSPECTION_INSTRUCTIONS_TEMPLATE
SET INSPECTION_INSTRUCTIONS = '{"instructions": [
	{
	  "title": "Boroscope Requirements Incoming",
	  "basicRequirement": [
		{
		  "name": "Fan & Booster",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Combustor",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "HPT Nozzle",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "HPT",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "LPT",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Other",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Comments",
		  "type": "freetext",
		  "value": ""
		}
	  ],
	  "additionalRequirement": [
		{
		  "name": "Photos",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Video: Fault",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Video: Full",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Video: Other",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Comments",
		  "type": "freetext",
		  "value": ""
		}
	  ]
	},
	{
	  "title": "Boroscope Requirements Outgoing",
	  "basicRequirement": [
		{
		  "name": "Fan & Booster",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Combustor",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "HPT Nozzle",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "HPT",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "LPT",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Other",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Comments",
		  "type": "freetext",
		  "value": ""
		}
	  ],
	  "additionalRequirement": [
		{
		  "name": "Photos",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Video: Fault",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Video: Full",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Video: Other",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Comments",
		  "type": "freetext",
		  "value": ""
		}
	  ]
	},
	{
	  "title": "Health Check Requirements",
	  "basicRequirement": [
		{
		  "name": "Main MCD",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Forward Sump Screen",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Aft Sump Screen",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "TGB Screen",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "AGB Screen",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Backup Oil Filter",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Supply Oil Filter",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Fuel Filter",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Starter MCD",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "IDG MCD",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Comments",
		  "type": "freetext",
		  "value": ""
		}
	  ]
	},
	{
	  "title": "Test Requirements",
	  "basicRequirement": [
		{
		  "name": "Testing 000- Engine Assembly Engine Test 000- General",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 001- Engine Assembly- Engine Test 001-Operating Limits",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 002- Engine Assembly- Engine Test 002-Engine Functional Test",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 003- Engine Assembly- Engine Test 003-Engine Acceptance Test",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 004- Engine Assembly- Engine Test 004-Fan Trim Balance",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 005- Engine Assembly- Engine Test 005-Core Trim Balance",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Testing 009- Engine Assembly- Engine Test 009-No.4 Bearing Defect Screening",
		  "type": "boolean",
		  "value": false
		},
		{
		  "name": "Engine Oil Type",
		  "type": "text",
		  "value": ""
		},
		{
		  "name": "CIS Fuels",
		  "type": "text",
		  "value": ""
		},
		{
		  "name": "Comments",
		  "type": "freetext",
		  "value": ""
		}
      ]
    }
  ]}' WHERE ENGINE_FAMILY = 'CFM56' AND ENGINE_MODEL = '5B';;


UPDATE ENGINE_INSPECTION_INSTRUCTIONS_TEMPLATE
SET INSPECTION_INSTRUCTIONS = '{"instructions": [
   {
 	"title": "Boroscope Requirements Incoming",
 	"basicRequirement": [
 	  {
 		"name": "HPC",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Combustor",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "HPT",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "LPT",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Other",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Comments",
 		"type": "freetext",
 		"value": ""
 	  }
 	],
 	"additionalRequirement": [
 	  {
 		"name": "Photos",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Video: Fault",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Video: Full",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Video: Other",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Comments",
 		"type": "freetext",
 		"value": ""
 	  }
 	]
   },
   {
 	"title": "Boroscope Requirements Outgoing",
 	"basicRequirement": [
 	  {
 		"name": "HPC",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Combustor",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "HPT",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "LPT",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Other",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Comments",
 		"type": "freetext",
 		"value": ""
 	  }
 	],
 	"additionalRequirement": [
 	  {
 		"name": "Photos",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Video: Fault",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Video: Full",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Video: Other",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Comments",
 		"type": "freetext",
 		"value": ""
 	  }
 	]
   },
   {
 	"title": "Health Check Requirements",
 	"basicRequirement": [
 	  {
 		"name": "Fuel Filter",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Oil Filter",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "A Sump MCD",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "B Sump MCD",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "C Sump MCD",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Starter MCS",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "IDG Filter",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "AGB Screen",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "TGB Screen",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Comments",
 		"type": "freetext",
 		"value": ""
 	  }
 	]
   },
   {
 	"title": "Test Requirements",
 	"basicRequirement": [
 	  {
 		"name": "Performance Test",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Break-In",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Vibration Survey",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "LP Rotor Trim Balance",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Acceleration Test",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Oil Con Run",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Oil Cleanliness",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Core Wash",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Engine Preservation",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Test On-Wing",
 		"type": "boolean",
 		"value": false
 	  },
 	  {
 		"name": "Engine Oil Type",
 		"type": "text",
 		"value": ""
 	  },
 	  {
 		"name": "CIS Fuels",
 		"type": "text",
 		"value": ""
 	  },
 	  {
 		"name": "Comments",
 		"type": "freetext",
 		"value": ""
 	  }
 	]
   }
 ]}' WHERE ENGINE_FAMILY = 'GE90';
