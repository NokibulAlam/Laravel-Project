$('.dropify').dropify();//Initialize dropify
$('.select').select2();//Initialize dropify
function showFromModal(modal_title, btn_text) {
    $('#store_or_update_form')[0].reset();
    $('#store_or_update_form update_id')[0].val('');
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