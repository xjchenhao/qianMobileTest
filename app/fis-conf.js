var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours()].join(''));
fis.config.set('modules.postpackager', 'seajs');
fis.config.set('modules.spriter', 'csssprites');
fis.config.merge({
    project:{
        // include : /(script|style|image|ajax)/ 设置源码文件的不知道怎么写
        // exclude：/(script|style|image|ajax)/ 过滤源码文件的不知道怎么写
    },
    roadmap: {
        domain: {
            //所有css文件添加http://localhost:8080作为域名
            '**.css': 'http://localhost:8080'
        },
        path: [{
            reg: /.*\.(js|css|jpg|png|gif|eot|svg|ttf|woff)$/,
            query: '?t=${timestamp}',
            useSprite: true,
            useHash: false
        }, {
            reg: '**.html',
            useCache: false
        }]
    },
    settings:{
        optimizer:{
            'uglify-js':{
                mangle:{
                    //export, module, require不压缩变量名
                    except: 'exports, module, require, define'
                },
                compress:{
                    //自动去除console.log等调试信息
                    drop_console: true
                }
            }
        },
        spriter:{
            csssprites:{
                //图之间的边距
                margin: 10,
                //使用矩阵排列方式，默认为线性`linear`
                layout: 'matrix'
            }
        }
    }
});

// //export, module, require不压缩变量名
// fis.config.set('settings.optimizer.uglify-js', {
//     mangle: {
//         except: 'exports, module, require, define'
//     }
// });
// //自动去除console.log等调试信息
// fis.config.set('settings.optimizer.uglify-js', {
//     compress: {
//         drop_console: true
//     }
// });
// // fis.config.set('settings.spriter.csssprites', {
// //     //图之间的边距
// //     margin: 10,
// //     //使用矩阵排列方式，默认为线性`linear`
// //     layout: 'matrix'
// // });