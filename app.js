
var app = {};

// var delay = 150000;
// var timer = setTimeout(timerStart, delay);
             
// function timerStart() {
//     xclm.nav.go($('#menu').find('li:first a').attr('data-slide-go'));
// };

app.init = function(e)
{
    // e.add('012-visit-chem-kadc-1', 'onAfterLoad', function() {
    //     clearTimeout(timer);
    // }); 
    e.add('32-slide', 'onAfterLoad', function() {
        // Инициализируем калькулятор для одной пациентки
        $('.dose-selector').bind('click touchstart', calc_one);
        $('#weight').bind('touchstart click keyup change', calc_one);
        
        // Инициализируем калькулятор для нескольких
        $('#number').bind('touchstart click keyup change', calc_few);
        
        // Инициализируем переключатель
        $('#md_one').bind('touchstart click', function() {
            $('#calc_few').addClass('hidden');
            $('#calc_one').removeClass('hidden');
            $('#md_one').addClass('active');
            $('#md_few').removeClass('active');
        });
        
        $('#md_few').bind('touchstart click', function() {
            $('#calc_one').addClass('hidden');
            $('#calc_few').removeClass('hidden');
            $('#md_few').addClass('active');
            $('#md_one').removeClass('active');
        });

        $('.buttons li').on('click touchstart', function() {
            $('.buttons li').removeClass('active');
            $(this).addClass('active');
        });
        
        
    });

    e.add('37-slide', 'onAfterLoad', function() {
    
        var text = '';
        var textSubmit = 'С уважением, <br/>компания "Рош"';
        // мой код
        $('#emailInput').on('focus', function() {
            console.log('Scroll focus '+$('#emailInput').val());            
            if ($('#emailInput').val() == 'E-mail получателя') 
                $('#emailInput').val('');
            
            $('body').css({position:'absolute'});
            $(window).scrollTop(0);
        })
        $('#emailInput').on('blur', function(){
            if ($('#emailInput').val() == '') 
            {
                $('#emailInput').val('E-mail получателя');
                $('#emailInput').css('color','#ccc');
            };

            console.log('Scroll blur');
            $('body').css({position:'fixed'});
        })
        $('#emailInput').on('keyup', function(){
            $('#emailInput').css('color','#000');
        })

        
    
        $('.xclmSentBtn').bind('click touchstart', that.open);
        $('.formSentBack').bind('click touchstart', that.close);

        $('.xclmOpenFile').each(function() {
            $(this).bind('touchstart click', function(event) {
                console.log('Try to open');
                var x = event.screenX, y = event.screenY;
                var element = $(event.currentTarget);
                xclm.app.open(element.attr('data-file'), x, y);
            });
        });
        
        // мой код
        $('.formSentMailButton').bind('touchstart click', function() {
            var mstring = 'mailto:' + $(".formSentMail").val() + '?subject=Материалы%20от%20компании%20Рош&body='+text+ '<br/><br/>' + textSubmit;
            $('.formSentMailButton').attr('href', mstring);
        });
        // мой код
        
        $('.xclmAttachFile').bind('touchend click', function(event) {
            if($(this).attr('data-url') == 'russco') {
               text = ''; 
            } else {
                text = 'Уважаемый коллега, <br/> в продолжение нашего разговора направляю Вам следующие файлы:';
            }   
            textSubmit = ' С уважением, <br/>Компания ЗАО «РОШ-Москва»';
            var total = 0;
            $('.xclmAttachFile').each(function() {
                if ($(this).prop('checked')) 
                {
                    total++;
                    
                    if($(this).attr('data-url') == 'links') {
                        console.log($(this).attr('data-url'));
                        text = text+ '<br/>' +'%20<a href="http://roche.medtv.xclm.ru/metastatic/">http://roche.medtv.xclm.ru/metastatic/</a><br/>%20<a href="http://roche.medtv.xclm.ru/neo/">http://roche.medtv.xclm.ru/neo/</a>' ;
                    } else if($(this).attr('data-url') == 'russco') {
                        text = text+ '<br/> Уважаемый коллега, <br/> компания Рош приглашает Вас принять участие в сателлитных симпозиумах в рамках Большой конференции RUSSCO «Рак Молочной Железы»: <br/><br/> 1. 02 февраля 2017 г в 12:00 «Ранний рак молочной железы у пациенток фертильного возраста:<br/>в поиске оптимального решения», зал «Бальный»<br/>2. 03 февраля 2017 г.  в 12:00 «Метастазы HER2+ РМЖ в головной мозг: как улучшить прогноз?<br/>Мультидисциплинарный подход: возможности химиотерапевта, радиолога, нейрохирурга»<br/>Адрес: Москва, ул. Тверская, дом 3, отель  «The Ritz-Carlton, Moscow»<br/>' ;                        
                    }
                     else {
                        text = text+ '<br/>' +'%20<a href="http://roche.xpractice.ru'+$(this).attr('data-url')+'">'+$(this).attr('data-title')+'</a>' ;
                    }
                }
                console.log(text);
            });
            
            
            $('#xclmFileNumber').html(total);

        });
        
        
    });

 function calc_few()
{
    var number = $('#number').val();
    
    if (number < 1) return;
    
    $('#num160few').text(number*13);
    $('#num100few').text(number*13);
}

function calc_one()
{
    var weight = $('#weight').val(); 

    var dose=3.6;
    
    var dose_total = dose*weight;

    var num160once = 0;
    var num100once = 0;

    if (weight < 0)
        $('#weight').val(0);

    if (weight >160)
        $('#weight').val(160);



    if (weight < 44) {
        var num160once = 1;
        var num100once = 0;
    }

    if (weight > 133) {
        var num160once = 3;
        var num100once = 1;
    }



    if ((weight >= 44) && (weight <= 55))
    {
        var num160once = 0;
        var num100once = 2;
    }

    if ((weight >= 56) && (weight <= 72))
    {
        var num160once = 1;
        var num100once = 1;
    }

    if ((weight >= 73) && (weight <= 83))
    {
        var num160once = 0;
        var num100once = 3;
    }

    if ((weight >= 84) && (weight <= 89))
    {
        var num160once = 2;
        var num100once = 0;
    }

    if ((weight >= 90) && (weight <= 100))
    {
        var num160once = 1;
        var num100once = 2;
    }

    if ((weight >= 101) && (weight <= 116))
    {
        var num160once = 2;
        var num100once = 1;
    }
    
    if ((weight >= 117) && (weight <= 133))
    {
        var num160once = 3;
        var num100once = 0;
    }

    var num160total= num160once*13;
    var num100total= num100once*13;
    
    
    $('#num160once').text(num160once);
    $('#num100once').text(num100once);
    $('#num160total').text(num160total);
    $('#num100total').text(num100total);

    var dose_total_digits = Math.round(dose_total*10) / 10;
    
    $('#dose-total').text(dose_total_digits);
}


                       
};   