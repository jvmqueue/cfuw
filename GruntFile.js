Skip to content
Please note that GitHub no longer supports your web browser.
We recommend upgrading to the latest Google Chrome or Firefox.

This repository
Search
Pull requests
Issues
Marketplace
Explore
 @jvmqueue
Sign out
2
0 1 geoffdcotton/cfuw
forked from jvmqueue/cfuw
 Code  Pull requests 0  Projects 0  Wiki  Insights
cfuw/GruntFile.js
Fetching contributors…
Cannot retrieve contributors at this time
     
82 lines (71 sloc)  1.62 KB
/* Reference: http://adrianmejia.com/blog/2014/10/07/grunt-js-tutorial-from-beginner-to-ninja/ */
/* Reference installing grunt packages: https://developer.tizen.org/dev-guide/2.2.0/org.tizen.web.appprogramming/html/guide/w3c_guide/perf_guide/install_use_grunt.htm Glenn */
var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-clean');




module.exports = function(grunt){


	grunt.initConfig({
		jshint:{
			  all: [
				'scripts/view/home.js'
			  ]
		},
		csslint:{
			  all: [
				'styles/*.css'
			  ]
		},
		cssmin: {
		  combine: {
		    files: {
		      'styles/indexMinified.css': ['styles/index.css', 
		      'styles/theme.css',
		      'styles/booksale.css',
		      'styles/animations.css'
		      ]
		    }
		  }
		},		
	   uglify:{
			compress: {
				files: {
				  'scripts/minified/main.js': [
				  'scripts/view/home.js',
				  'scripts/model/*'
				  ]
				}
			}
		},
		clean:{
			css:['minified'],
			js:['minified']
		}		
	})
};

grunt.registerTask('de', function(){console.log('Reached de');});

grunt.registerTask('default', [
	'jshint',
	'csslint',
	'cssmin',
	'uglify'
]);
grunt.registerTask('lintjs', [
	'jshint'
]);
grunt.registerTask('lintcss', [
	'csslint'
]);
grunt.registerTask('lintcssmin', [
	'cssmin'
]);
grunt.registerTask('lintuglify', [
	'uglify'
]);
grunt.registerTask('lintmin', [
	'uglify',
	'cssmin'
]);
grunt.registerTask('lintclean', ['clean']);

© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About
Press h to open a hovercard with more details.