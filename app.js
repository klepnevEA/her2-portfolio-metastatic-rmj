
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