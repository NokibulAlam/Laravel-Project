$('.dropify').dropify();//Initialize dropify
$('.select').select2();//Initialize select2

function showFromModal(modal_title, btn_text) {
    $('#store_or_update_form')[0].reset();
    $('#store_or_update_form #update_id')[0].val('');
    $('#store_or_update_form').find('.is-invalid').removeClass('is-invalid');
    $('#store_or_update_form').find('.error').remove();
    $('.dropify-clear').trigger('click');
    $('#store_or_update_modal').modal({
        keyboard: false,
        backdrop: 'static',
    });
    $('#store_or_update_modal .modal-title').html('<i class="fas fa-plus-square"></i>'+Modal_title);
    $('#store_or_update_modal #save-btn').text(btnText);
}

function select_all() {
    if($('#select_all:checked').length == 1){
        $('.select_data').prop('checked',true); 
        if($('.select_data:checked').length >= 1)
        {
            $('.delete_btn').removeClass('d-none');
        }
    }else{
        $('.select_data').prop('checked',false);
        $('.delete_btn').addClass('d-none');
    }
}

function select_single_item(id){
    var total = $('.select_data').length; //count total checkbox
    var total_checked =  $('.select_data:checked').length;//count total checked checkbox
    (total == total_checked) ? $('#select_all').prop('checked',true) : $('#select_all').prop('checked',false);
    (total_checked >= 0) ? $('.delete_btn').removeClass('d-none') : $('.delete_btn').addClass('d-none');
}

function notification(status, message)
{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: status,
        title: message
      });
}

function store_form_data(table, method, url, formData) {
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: "JSON",
        contentType: false,
        processData: false,
        cache: false,
        beforeSend: function(){
            $('#save-btn').addClass('kt-spinner kt-spinner--md kt-spinner--light');
        },  
        complete: function(){
            $('#save-btn').removeClass('kt-spinner kt-spinner--md kt-spinner--light');
        },
        success: function (data) {
            $('#store_or_update_form').find('.is-invalid').removeClass('is-invalid');
            $('#store_or_update_form').find('.error').remove();
            if (data.status == false) {
                $.each(data.errors, function (key, value) {
                    $('#store_or_update_form #' + key).addClass('is-invalid');
                    $('#store_or_update_form #' + key).parent().append(
                        '<small class="error text-danger">' + value + '</small>');
                });
            } else {
                notification(data.status, data.message);
                if (data.status == 'success') {
                    if (method == 'update') {
                        table.ajax.reload(null, false);
                    } else {
                        table.ajax.reload();
                    }
                    $('#store_or_update_modal').modal('hide');
                }
            }
        },
        error: function (xhr, ajaxOption, thrownError) {
            console.log(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
}

function delete_data(id, url, table, row, name) {
    Swal.fire({
        title: 'Are you sure to delete ' + name + ' data?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: url,
                type: "POST",
                data: {
                    id: id,
                    _token: _token
                },
                dataType: "JSON",
            }).done(function (response) {
                if (response.status == "success") {
                    Swal.fire("Deleted", response.message, "success").then(function () {
                        table.row(row).remove().draw(false);
                    });
                }
            }).fail(function () {
                swal.fire('Oops...', "Somthing went wrong with ajax!", "error");
            });
        }
    });
}