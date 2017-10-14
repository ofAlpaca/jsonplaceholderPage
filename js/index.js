$(document).ready(function($) {

    var photo_ls = [];
    var load_cnt = 0;

    function ajax_call_photots(ls) {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type: 'GET'
        }).done(function(data){
            ls(data);
        });
        load_cnt = 0;
    };

    function loadMore(start_index)
    {
        $(this).delay(80000);
        var data_row = '';
        var i = start_index;
        for ( ; i < start_index + 10 ; i++) {
            data_row += '<td>' + photo_ls[i].id + '</td>';
            data_row += '<td>' + photo_ls[i].userId + '</td>';
            data_row += '<td>' + photo_ls[i].title + '</td>';
            $('#j_table').append('<tr class="info" style="display:none;">' + data_row + '</tr>');
            $('.info').fadeIn(1500);
            $('#j_table').append('<tr class="body" style="display:none;"><td class="col-lg-1"></td><td class="col-lg-1"></td><td class="col-lg-6">' + photo_ls[i].body + '</td></tr>');
            data_row = '';
        }
        load_cnt = i;
    }

    function bindScroll(){
        var input = $('#keywdInput').val(); // Do not load more data while searching.
        if(input == '' && $(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            //alert(load_cnt);
            loadMore(load_cnt);
        }
    }

    ajax_call_photots(function(data){
        photo_ls = data;
        loadMore(load_cnt);
    });

    $('#j_table').on('click', '.info', function() {
        // console.log('clicked');
        if ($(this).next().css('display') == 'none')
            $(this).next().css({'display':''});
        else
            $(this).next().css({'display':'none'});
    });

    $('#butt').click(function(){
        load_cnt = 0;
        var input = $('#keywdInput').val();

        if(input == '') {
            $('.info').empty();
            loadMore(load_cnt);
        }
        else {
            var show_ls = [];
            var str = '';
            for (var i = 0; i < photo_ls.length; i++) {
                str = photo_ls[i].title;
                if (str.indexOf(input) >= 0) {
                    show_ls.push(photo_ls[i]);
                }
            }

            $('.info').empty();
            var data_row = '';
            for (var i = 0; i < show_ls.length; i++) {
                data_row += '<td>' + show_ls[i].id + '</td>';
                data_row += '<td>' + show_ls[i].userId + '</td>';
                data_row += '<td>' + show_ls[i].title + '</td>';
                $('#j_table').append('<tr class="info" style="display:none;>' + data_row + '</tr>');
                $('.info').fadeIn(1500);
                $('#j_table').append('<tr class="body" style="display:none;"><td class="col-lg-1"></td><td class="col-lg-1"></td><td class="col-lg-6">'
                    + show_ls[i].body + '</td></tr>');
                data_row = '';
            }
        }
    });

    $(window).scroll(bindScroll);

    $('#des-btn').click(function () {
        $('.container').fadeOut(1000);
    });

    $('#more').click(function(){
        loadMore(load_cnt);
    });
});
