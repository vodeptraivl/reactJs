// var socket = io('https://vodeptrai.herokuapp.com',{timeout:1000});
var socket = io('http://localhost:3000');

socket.on('Server-send-dk-tc', function (data) {
    $('.login-from').hide(200);
    $('.chat-from').show(100);
    $('.hello-name').html('<p> logout with '+data+'</p>');
    $('.content').html('');
});
socket.on('Server-send-newuser', function (data) {
    $('.alertmss').html('<p> '+data+' connect</p>')
    setTimeout(function(){
        $('.alertmss').html('');
    },2000)
});
socket.on('sv-send-ds-user', function (data) {
    var dirs = $('.content-id');
    dirs.html('');
    var ds = '';
    data.forEach(function(i){
        ds = ds + '<p>'+i+'</p>';
    });
    dirs.html(ds);
 });
 socket.on('Server-log-al',function(data){
    $('.alertmss').html('<p> '+data+' disconnect</p>')
    setTimeout(function(){
        $('.alertmss').html('');
    },2000)
 });
 socket.on('sv-data-mess',function(data){
    $('.content').append('<p>'+data+'</p>');
 });
 socket.on('Server-logout',function(data){
    $('.content').html('');
    $('.hello-name').html('');
    $('.mess').val('');
    $('.names').val('');
    $('.login-from').show(200);
    $('.chat-from').hide(100);
 });
$(document).ready(function () {
    $('.login-from').show();
    $('.chat-from').hide();
    $('.btn-go').click(function(){
        // var names = new RegExp("^[0-9aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]{2,10}$");
        var name = $.trim($('.names').val());
        // if(names.test(name)){
            socket.emit('client-sent-name',name);
        // }else{
        //     alert('name Invalid');
        // }
    });
    $('.hello-name').click(function(){
        socket.emit("logout");
    });
    $('.btn-send').click(function(){
        var content = $.trim($('.mess').val());
        // var names = new RegExp("^[0-9aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]{2,20}$");
    //    if(names.test(content)){
            socket.emit('contentmess',content);
            $('.mess').val('')
        // }else{
        //     alert('message invalid')
        // }
    })
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            $('.btn-send').click();
        }
    });
})