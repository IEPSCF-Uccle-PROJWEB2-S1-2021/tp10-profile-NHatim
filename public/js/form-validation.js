const forms = document.querySelectorAll('.needs-validation');
const btn = document.querySelector('.btn-primary');


// Enable Bootstrap validation custom styles
// https://v5.getbootstrap.com/docs/5.0/forms/validation/#custom-styles
const checkValidity = () =>{
  forms.forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
        true;
      },
      false
    );

  });
}

// btn.addEventListener('click', () => {
//   if(!checkValidity){
//     alert(`Impossible d'accéder à la page login veuillez vérifier les champs rouges`);
//   }
// })

