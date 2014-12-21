var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()].join(''));
fis.config.set('modules.postpackager', 'seajs');
fis.config.set('modules.spriter', 'csssprites');
fis.config.merge({
    project:{
        // include : /(script|style|image|ajax)/ 设置源码文件的不知道怎么写
        exclude:'iis.exe'
    },
    roadmap: {
        domain :'http://qian.wdaics.com/test/wx',
        path: [{
            reg: /.*\.(html|js|css|jpg|png|gif|eot|svg|ttf|woff|less)$/,
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