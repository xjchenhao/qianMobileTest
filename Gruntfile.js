module.exports = function(grunt) {
    var transport = require('grunt-cmd-transport');
     var template = require('grunt-cmd-transport').template.init(grunt);
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);

    grunt.initConfig({
        // pkg : grunt.file.readJSON("package.json"),
        transport: {
            options: {
                paths: ['.'],
                // alias: '<%= pkg.spm.alias %>',
                parsers: {
                    '.js': [script.jsParser],
                    '.css': [style.css2jsParser],
                    '.html': [text.html2jsParser],
                    '.tpl': [template.tplParser]
                }
            },
            all: {
                options: {
                    idleading: ''
                },

                files: [{
                    expand: true,
                    cwd: 'app/script',
                    src: '**/*',
                    filter: 'isFile',
                    dest: '.build/script'
                }]
            }
        },
        copy: {
            transit: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    src: [
                        '*.{ico,png,txt}',
                        '{,*/}*.html',
                        'style/{,*/}*.css',
                        'image/{,*/}*.*'
                    ],
                    dest: '.build/'
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'app/script',
                    src: '*.js',
                    dest: '.build/script'
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    src: '*.exe',
                    dest: '.build/'
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    src: 'fis-conf.js',
                    dest: '.build/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '.build',
                    src: '**/*',
                    dest: '.dist/'
                }]
            },
            js1:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app/script',
                    src: '*.js',
                    dest: '.build/script'
                },{
                    expand: true,
                    dot: true,
                    cwd: '.build/script',
                    src:  '**/*',
                    dest: '.dist/script'
                }]
            },
            amazeui:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/amazeui/less',
                    src:  'amazeui.css',
                    dest: 'app/style'
                },{
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/amazeui/dist/js',
                    src:  'amazeui.js',
                    dest: 'app/script'
                }]
            }
        },
        concat : {
            options : {
                paths : ['.'],
                include : 'relative'
            },
            all : {
                options : {
	                paths : ['.build/script/'],
                    include : 'all'
                },
                files: [
                    {
                        expand: true,
                        cwd: '.build/script/',
                        src: ['module/**/*.js','page/**/*.js'],
                        dest: '.build/script/',
                        ext: '.js'
                    }
                ]
            }
        },
        clean: {
        	all:['.build','.dist'],
            library:['.build/script/jquery.js','.build/script/zepto.js','.build/script/amazeui.js'],
            transit: ['.build'],
            js: ['.dist/script'],
            dist:['.dist']
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('js', ['clean:js', 'transport:all','clean:library','concat:all','copy:js','clean:transit']);
    grunt.registerTask('all', ['clean:dist','transport:all','clean:library','concat:all','copy:transit','copy:dist','clean:transit']);
    grunt.registerTask('default', ['clean:all','copy:amazeui']);
};