<h1>Backbone App CFUW Saskatoon</h1> 
<p>Experimental Backbone Application</p>
<p><a href="http://www.cfuw-saskatoon.org/">Live URL</a></p>
<h2>Current State</h2>
<p>In Development</p>
<p>Using, but not limited to:</p>
<ul>
    <li>Primitive JavaScript</li>
    <li>Object oriented JavaScript</li>
    <li>jQuery</li>
    <li>Require JS</li>
    <li>Backbone JS</li>    
    <li>Underscore JS</li>    
    <li>Regular Expressions</li>    
    <li>CSS3</li>   
    <li>Grunt</li>
</ul>
<h3>Stategies and Techniques</h3>
<ul>
    <li>XML for page content via Backbone fetch</li>
    <li>Custom Utility for converting readable XML to JSON</li>
    <li>Custom Utility for Regular Expressions</li>
    <li>Backbone.js for employing Model View workflow</li>
    <li>underscore.js for HTML templates</li>
    <li>jQuery for DOM access</li>
    <li>Require JS for lazy loading, and encapsulation</li>
    <li>Grunt for CSS lint, JS Lint, and jsDoc</li>
    <li>Bower Grunt plug-in for quick resource download during app development</li>
    <li>Erwin Sublime plug-in for quick HTML editing</li>
</ul>
<h3>Development Work-flow</h3>
<ul>
    <li>Create branch from master</li>
    <li>Do Work</li>
    <li>Test locally</li>
    <li>Test on Dev</li>
    <li>Push to your branch</li>
    <li>Merge with Master</li>
    <li>Resolve conflicts</li>
    <li>Run Grunt task: lintcssmin... Prod requests minified CSS</li>
    <li>Push to Master</li>
    <li>Test on Dev</li>
    <li>git status ensure all is well</li>
    <li>Push to Prod</li>
</ul>
</ul>
<h4>Fundemental Architecture</h4>
<div>
    <pre>
        <code>
            ├── site
            │   ├── html resources
            │   ├── styles
            │   │   └── CSS resources
            │   ├── scripts
            │   │     └── main.js
            │   │     └── config.js
            │   │     └── exception            
            │   │     └── model            
            │   │     └── view            
            │   │     └── util
            │   ├── bower_components            
            │   │     └── backbone
            │   │     └── bootstrap
            │   │     └── jquery
            │   │     └── underscore
            
        </code>
    </pre>
</div>


 

 
