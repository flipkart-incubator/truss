Truss
===================
Truss is a JavaScript framework to develop modular, event based applications.

It helps you write applications that are high performant with little learning curve. On top of that, it provides a great ecosystem of extensions and modules to help to you.


Installation
-------------
To install the latest version:
```
npm install trussjs@https://github.com/flipkart-incubator/truss.git
```


Alternatively, you can also include script file in your html as:
```
<script src="https://raw.githubusercontent.com/flipkart-incubator/truss/master/dist/truss.min.js"></script>
```


Documentation
-------------

#### Module-

Any view/html/behaviour that you see on the page comes from some module. Module represents a section/area on the page.
For example, module can be a Header module consisting of an Logo, Title, Username & Password fields and Login button. 
The look and feel, behaviour of the header section on the page is defined by Header Module.



#### Core Truss Module Functions-

createInstance- returns a promise, which gets resolved when the module gets rendered

destroyInstance- destroys the module instance


#### Module Config Structure-

    {
    moduleName: "<Name of your module>",

    instanceConfig: {

        container: "<css selector of the module>”,

        placeholders: {

            (optional)key:value 

        },

        initOn(optional):{

            eventName: <Name of the event>

            eventPublisher: <css selector of event publisher>

        }

        listensTo:[{

            eventName: <Name of the event>,

            callback: <Name of the callback function>

            type(optional): <Type of event listener>

        }]

    }
    module: <moduleInstance>
    }
[Example of Basic App](examples/basic-app/README.md)

moduleName: (String) This is the name of your custom module.

container: (String) This is the css selector, where you want your module to be stitched.

placeholders: (JSON) These are written as key value pairs. The key represents the placeholder for some data to be included in the HTML, and the value is the corresponding data.

initOn: (JSON) Initialises the module, if the event gets published. Use this if you want to conditionally initialise the module.

listensTo: (Array) This contains an Array of Event Listeners that the module is subscribed to.

eventName: (String) Contains the name of the event.

callback: (String) Function to be called when the event gets published.

type: (String) The type of listener. The various types are defined below.

module: (Module) This contains the imported module from the path of the module. 


#### Types of Listeners-

1.PLAY_AFTER_RENDER: This is the default type of listener. The context of the listener becomes active only after it gets rendered. Therefore, the callback function gets executed only after the listening module gets rendered, and all other calls prior to rendering are ignored.
    [Example of Play_After_Render](examples/listensto-app-play_after_render/README.md)

2.RE_PLAY: In the case of this type of listener, the context of the listener is present before rendering. The events published before rendering also get reflected, after the module gets rendered, the next time the event is fired. 
    [Example of Re_Play](examples/listensto-app-replay/README.md)

3.KEEP_ON: In this type of listener, the events published before rendering are recorded, and are re-applied every time the event gets published after rendering.
    [Example of Keep_On](examples/listensto-app-keep_on/README.md)    



#### Truss Module API-

1.resolveRenderOn- This returns a promise which, on resolution, calls the render function. This function should contain any required pre-rendering tasks .
    [Example of resolveRenderOn](examples/resolve-render-&-after-render/README.md)

2.render- This function should contain the tasks that are involved in rendering of the module.

3.onRenderComplete- This function is called after completion of render, and should contain post-rendering tasks.

