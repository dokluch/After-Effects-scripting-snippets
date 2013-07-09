/*
Скрипт для короткометражки "Бинарное"
Берет все выделенные видео и добавляет им эффект "вебкамеры" с кастомовыми  цветами.
Все эффекты основаны на пресетах, находящихся в папке Presets\Binary, созданы отдельно.

осталось сделать чтобы скрипт брал все из указанной папки, а потом - брал из XML значения входный и выходных значений,
но так как это нафиг не нужно в данных условиях, то и делать не буду.

(С) nik ska, 2011
CC-BY-NC, bitches!
*/


var count = app.project.numItems; //количество элементов
var templatename = "lagarith"; //меняем темплэйт на нужный

function clearall()
{
    if(count!=0){ //remove all the items   
        for(i=1;i<=count;i++){
            
            if(app.project.item(1).typeName=="Folder"){ //если это папка - удаляем ее нахуй и пересчитываем количество оставшихся объектов.
                count=app.project.numItems;
                }
            app.project.item(1).remove();
            }
    }
}

//clearall();

var sel_vids = app.project.selection; //создаем массив со всеми выбранными объектами
var insidefolder, webcamfolder; //переменные-пустышки для результатов работы функций
var vid; //переменная для обрабатываемого видео

//загружаем все пресеты
var rampPreset = File(["./Presets/Binary/binary_ramp.ffx"]);
var colorPreset = File(["./Presets/Binary/binary_color.ffx"]);
var lensPreset = File(["./Presets/Binary/binary_lens.ffx"]);


function checkfolders(){
    /*
      функция прогоняет по всем папкам, если уже есть папки с нужным названием,
      то используются они. в обратном случае создаются новые.
      */
    var isinside = false; //это не пайтон, объявлять приходится по очереди
    var isweb=false;


    for(i=1;i<=count;i++){
        if(app.project.item(i).typeName=="Folder"){
            if(app.project.item(i).name=="inside"){
                insidefolder = app.project.item(i);
                isinside=true;
                }
            else if(app.project.item(i).name=="webcam"){
                webcamfolder = app.project.item(i)
                isweb=true;
                }
            }
        }
    if(isinside==false){
        insidefolder = app.project.items.addFolder("inside");
        }
    if(isweb==false){
        webcamfolder = app.project.items.addFolder("webcam");
        }
}

function namehandler(videoname){
    //отрезает расширение от названия видео
    var last=videoname.lastIndexOf('.');
    return(videoname.substr(0, last));
   }
     
function loopthrough(){
    /*
    функция прогоняет по всем выбранным объектам, проверяет их тип
    и если это видео - начинает обработку
     */
     app.beginUndoGroup("processing vids");
        for(i=0;i<sel_vids.length;i++){
            if(sel_vids[i]!=null){
                if(sel_vids[i].typeName=="Footage"){
                    vid = sel_vids[i];
                    //alert("OK");
                    doit();
                    }
                else{
                    alert("Choose a video");
                    }
                }
            else{
                alert("Choose at least something");
            }
        }
    app.endUndoGroup();
}


function doit(){
     //основа скрипта. создает соответствующие композиции и подставляет все нужные эффекты   
     
    //внутренняя композиция, только добавление эффекта искривления
    var incomp = app.project.items.addComp(namehandler(vid.name)+"_inside",vid.width,vid.height,vid.pixelAspect,vid.duration,vid.frameRate);
   
   var inlayers = incomp.layers;
    inlayers.add(vid);
    
    var adjlayer1=inlayers.addSolid([255,255,255], "Lens", incomp.width, incomp.height, incomp.pixelAspect, incomp.duration); //создаем аджасмент лаер
    adjlayer1.label=5; //делаем лэйбел цвета аджасмент лаера
    adjlayer1.adjustmentLayer  = true; //делаем на самом деле аджасмент лаером
    adjlayer1.applyPreset(lensPreset);
    
    //подрезанная внешняя композиция
    var outcomp = app.project.items.addComp(namehandler(vid.name)+"_webcam",1608,904,vid.pixelAspect,vid.duration,vid.frameRate);
    var outlayers=outcomp.layers; //создаем новый набор слоев
    outlayers.add(incomp); //вставляем композицию    
    var adjlayer2 = outlayers.addSolid([255,255,255], "colors", outcomp.width, outcomp.height, outcomp.pixelAspect, outcomp.duration); //создаем аджасмент лаер
    adjlayer2.label=5; //делаем лэйбел цвета аджасмент лаера
    adjlayer2.adjustmentLayer  = true; //делаем на самом деле аджасмент лаером
    adjlayer2.applyPreset(colorPreset);

    var solidlayer=outlayers.addSolid([0,0,0], "Solid Black", outcomp.width, outcomp.height, outcomp.pixelAspect, outcomp.duration);
    solidlayer.Opacity.setValue(30);

    var mattelayer = outlayers.addSolid([40,40,40], "Matte", outcomp.width, outcomp.height, outcomp.pixelAspect, outcomp.duration);
    mattelayer.applyPreset(rampPreset);
    
    //запихиваем композиции в папки
    incomp.parentFolder = insidefolder;
    outcomp.parentFolder = webcamfolder;
    
    //на всякий случай проверка
    if(solidlayer.hasTrackMatte!=null){
        //solidlayer.trackMatteType=3815; //установить значение LUMA. Ну пиздец я наебался чтобы с этим enum разобраться
        solidlayer.trackMatteType = TrackMatteType.LUMA;
    }
    
    //добавить композицию в рендер
    var renderit = app.project.renderQueue;
    renderit.items.add(outcomp);
    renderit.item(renderit.items.length).outputModules[1].applyTemplate(templatename); //применяем темплэйт.
    
}

checkfolders();
loopthrough();