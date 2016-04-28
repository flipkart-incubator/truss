import fromHTML from "./templates/form.html";
import setHTML from "./templates/set.html";
import form_Instance from "modules/formBuilder";
import Validators from "modules/formBuilder/classes/validator";

 
// Form Section in the left is being generated from config present below

export default {
    "modules": [{
        "moduleName": "formBuilder",
        "instance": form_Instance,
		"instanceConfig": {
			"container": "#form",
			"placeholders": {
                "name": "form",
				"header": "Register Now",
				"subHeader": "Form generated using simple config",
				"template": fromHTML,
				"globals": {
					"validators": [{
						"name": "isRequiredValidator",
						"inheritDownDefault": false,
						"callMethod": Validators.validateIsRequired,
						"errorMessage": "<span class='text-danger'>Field is Required.</span>"
					},{
						"name": "isEmailValidator",
						"inheritDownDefault": false,
						"callMethod": Validators.validateIsEmail,
						"errorMessage": "<span class='text-danger'>Should be an email.</span>"
					}]
				},
				"sets": [
					{
						"name": "only-set",
						"template": setHTML,
                        //  Will change the config to generate signup form
						"fields": [{
								"type": "text",
								"label": "Email",
								"name": "email",
                                "placeholder": "Enter your email.",
								"class": "form-control",
								"validationType": "sync",
								"validationFailedClass": "error",
								"validator": ["isRequiredValidator"],
								"validateOn": "focusout"
							},
							{
								"type": "text",
								"label": "Username",
								"name": "username",
								"class": "form-control"
							},
							{
								"type": "select",
								"label": "Country",
								"name": "country",
								"class": "form-control",
								"options": [
									{
										"label": "Algeria",
										"value": "Algeria"
									},
									{
										"label": "Argentina",
										"value": "Argentina"
									},
									{
										"label": "Brazil",
										"value": "Brazil"
									},
									{
										"label": "Canada",
										"value": "Canada"
									},
									{
										"label": "Egypt",
										"value": "Egypt"
									},
									{
										"label": "Iceland",
										"value": "Iceland"
									},
									{
										"label": "India",
										"value": "India"
									},
									{
										"label": "Indonesia",
										"value": "Indonesia"
									}
								]
							},
							{
								"type": "password",
								"label": "Password",
								"name": "password",
								"class": "form-control",
								"placeholder": "Enter password"
							},{
								"type": "password",
								"label": "Re enter Password",
								"name": "repassword",
								"class": "form-control",
								"placeholder": "Enter password again"
							},
							{
								"type": "button",
								"name": "submit",
								"value": "Sign In",
								"class": "btn btn-default",
								"notForSubmit": true,
								"customURL": "/signup"
							},
							{
								"type": "button",
								"name": "save",
								"value": "Cancel",
								"class": "btn btn-primary",
								"notForSubmit": true,
								"customURL": "/save"
							}]
					}
				]
			}
		}
	}],
    VMConfig: {

        // Initial store
        store: {},

        // Config for DOM Events
        events: {
        }
    }
};

//  thanks for watching.:-)