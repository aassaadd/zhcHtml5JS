/**
 * Created by bm_zhc on 2015/10/29.
 */

//module.exports = function (grunt) {
//    // 项目配置
//    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),
//        concat: {
//            options: {
//                separator: ';'
//            },
//            dist: {
//                src: ['js/lib/*.js'],
//                dest: 'dest/libs.js'
//            }
//        },
//        uglify: {
//            build: {
//                src: 'dest/libs.js',
//                dest: 'dest/libs.min.js'
//            }
//        }
//    });
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    // 默认任务
//    grunt.registerTask('default', ['concat', 'uglify']);
//}

//module.exports = function(grunt) {
//
//    // Project configuration.
//    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),
//        uglify: {
//            build: {
//                src: 'js/app/api.js',
//                dest: 'dest/app/api.min.js'
//            }
//        }
//    });
//
//    // 加载包含 "uglify" 任务的插件。
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//
//    // 默认被执行的任务列表。
//    grunt.registerTask('default', ['uglify']);
//
//};

/*
 * 独立压缩
 * */
module.exports = function (grunt) {
    // 构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),
        //压缩js
        uglify: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd: 'js/',
                        src: '**/*.js',
                        dest: 'dist/js'
                    }
                ]
            }
        },
        //压缩css
        cssmin: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //美化代码
                beautify: {
                    //中文ascii化，非常有用！防止中文乱码的神配置
                    ascii_only: true
                }
            },
            my_target: {
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd: 'css/',
                        src: '*.css',
                        dest: 'dist/css'
                    },
                    {
                        expand: true,
                        //相对路径
                        cwd: 'js/',
                        src: '**/*.css',
                        dest: 'dist/js'
                    }
                ]
            }
        },
        //压缩图片
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    pngquant: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'images/',
                        src: ['*.{png,jpg,jpeg,gif,webp,svg}', '**/*.{png,jpg,jpeg,gif,webp,svg}'],
                        dest: 'dist/images'
                    }
                ]
            }
        },
        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/tpl',
                        src: ['*.html'],
                        dest: 'dist/js/tpl'
                    },
                    {
                        expand: true,
                        cwd: '',
                        src: ['*.html'],
                        dest: 'dist'
                    }
                ]
            }
        }
    });

    // 加载指定插件任务
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // 默认执行的任务
    //grunt.registerTask('default', ['uglify', 'cssmin', 'imagemin','htmlmin']);
    grunt.registerTask('default', ['uglify', 'cssmin']);
};