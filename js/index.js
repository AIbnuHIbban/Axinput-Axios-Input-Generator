$('#textarea').change(function () {
    var value = $("#textarea").val();
    var content = $(".content");
    var content_edit = $(".content_edit");
    var arrVal = value.split(",");
    var arrValLenght = value.split(",").length;
    var code_html = $(".code_html code");
    var code_html_edit = $(".code_html_edit code");
    var code_js = $(".code_js code");
    // var clipboard = $("#clipboard");
    content.html("");
    code_html.html("");
    code_html_edit.html('')
    code_js.html("");
    $('.result h1').addClass('d-none');
    $('.result .row').removeClass('d-none');
    $('.code_html h1').addClass('d-none');
    $('.code_html pre').removeClass('d-none');
    $('.code_html_edit h1').addClass('d-none');
    $('.code_html_edit pre').removeClass('d-none');
    $('.code_js h1').addClass('d-none');
    $('.code_js pre').removeClass('d-none');
    
    var variable    = "";
    var data_update = "";
    for (let i = 0; i < arrValLenght; i++) {
        variable    += `var ${arrVal[i]}                  = res.data.data.${arrVal[i]};\n            `
        content_edit.append(`<div class="form-group">
    <label for="${arrVal[i]}">${arrVal[i].replace('_',' ')}<span class="text-danger">*</span></label>
    <input data-id="" value="" parsley-trigger="change" type="text" name="" required placeholder="Masukkan ${arrVal[i].replace('_',' ')}" class="form-control add" id="${arrVal[i]}_edit">
</div>`)
        data_update += `${arrVal[i]}   : $('#${arrVal[i]}_edit').val(), \n            `
        content.append(`<input class="mt-3" id="${arrVal[i]}" type="text" placeholder="${arrVal[i].replace('_',' ')}"/>
`);
    }
    var axios_init = '_get()\n \n';
    var axios_get = `function _get() {
    axios({
        method: 'get',
        url: '',
    })
    .then((result) => {
        response = result.data.data
        $.each(response,function(i,t){
            console.log(response);
        })
    }
})\n \n`
    var axios_add = `$('#form-create').submit(function(e){
    $('#modal-create').modal('hide');
    e.preventDefault()
    // let foto = document.getElementById("foto").files[0]
    var data = new FormData($(this)[0])
    // data.append('foto', foto, foto.name)
    // Swal.showLoading()
    axios({
        method: 'post',
        url: '',
        data: data,
        // headers: { 
        //     'content-type': 'multipart/form-data' 
        // }
    })
    .then((res) => {
        if (res.data.status == 'success') {
            _get()
            // Swal.fire(
            //     'Berhasil',
            //     'Berhasil Menambah Data!',
            //     'success'
            // )
        } else {
            // Swal.fire(
            //     'Gagal!',
            //     'Terjadi Kesalahan',
            //     'error',
            // )
        }
    })
    // $('.swal2-confirm').focus()
}) \n \n`

    var axios_edit = `function modalEdit(id) {
        // Swal.showLoading()
        $('#modal-body-edit').html('')
        axios({
            method: 'get',
            url: ''
        })
        .then((res) => {
            // Swal.close()
            ${variable}
            // $('#modal-body-edit').append()
            $('#modal-edit').modal('show');
        })
    }\n \n`

    var axios_update = `$('#form-edit').submit(function(event) {
    event.preventDefault()
    $('#modal-edit').modal('hide')
    // var id      = $('#name_edit').data('id')
    // Swal.showLoading()
    axios({
        method: 'PUT',
        url: ''
        data: {
            ${data_update}
        }
    })
    .then((res) => {
        if (res.data.status == 'success') {
            // Swal.fire(
            //     'Tersimpan!',
            //     'Perubahan Berhsail di Simpan!',
            //     'success',
            // )
            _get()
        } else {
            // Swal.fire(
            //     'Gagal!',
            //     'Terjadi Kesalahan',
            //     'error',
            // )
        }
    })
})\n \n`

    var axios_delete = `function hapus(id) {
    // Swal.fire({
    //     title: 'Hapus Data',
    //     text: "Apakah anda yakin ingin menghapus data ini?",
    //     type: 'question',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Ya, hapus!',
    //     cancelButtonText: 'Tidak',
    // }).then((result) => {
    //     if (result.value) {
    //         Swal.fire({
    //             onOpen: () =>  {
    //                 Swal.showLoading()
    //             }
    //         })
            axios({
                method: 'delete',
                url: ''
            })
            .then((res) => {
                if (res.data.status == 'success') {
                    // Swal.fire(
                    //     'Terhapus!',
                    //     'Deta telah Terhapus!',
                    //     'success',
                    // )
                    _get()  
                } else {
                    // Swal.fire(
                    //     'Gagal!',
                    //     'Terjadi Kesalah',
                    //     'error',
                    // )
                }
            })
    //     }
    // })
}`
    code_html.append(
        content
            .html()
            .replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
    );
    code_html_edit.append(
        content_edit
            .html()
            .replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
    );
    code_js.append(axios_init);
    code_js.append(axios_get);
    code_js.append(axios_add);
    code_js.append(axios_edit);
    code_js.append(axios_update);
    code_js.append(axios_delete);

    var clipboard = $("#clipboard");
    clipboard.text("");
    clipboard.text(code_js.text());
})

function copyClipboard(jenis) {
    var clipboard = $("#clipboard");
    clipboard.select();
    document.execCommand("copy");
    alert("berhasil");
}