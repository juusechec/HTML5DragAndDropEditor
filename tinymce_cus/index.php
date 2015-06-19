<!-- Load jQuery -->
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript">
        google.load("jquery", "1.3");
</script>

<script type="text/javascript" src="tinymce.min.js"></script>
<script type="text/javascript">
tinymce.init({
    selector: "textarea",
    theme: "modern",
    plugins: [
        "image"
    ],
    menubar : false,
    statusbar: false,
    toolbar: "template images",
    //toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    //toolbar2: "print preview media | forecolor backcolor emoticons",
    //toolbar3: "template",
    image_advtab: true,
    paste_data_images: true,
    templates: [
        {title: 'Test template 1', content: 'Test 1'},
        {title: 'Test template 2', content: 'Test 2'},
	{title: 'Plantilla 3', content: 'HOLALAALALA'}
    ]
});

var dragHelper = new tinymce.ui.DragHelper('mydiv', {
    start: function(evt) {
console.log("start",evt);
    },

    drag: function(evt) {
console.log("drag",evt);
    },

    end: function(evt) {
console.log("end",evt);
    }
});

</script>

<form method="post" action="somepage">
    <textarea name="content" style="width:100%"></textarea>
</form>
