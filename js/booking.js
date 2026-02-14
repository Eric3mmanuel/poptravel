// Initialize EmailJS
emailjs.init("QOwNJpiLjXIA9md_b");

// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 🔄 Loading popup
    Swal.fire({
      title: "Sending Booking...",
      text: "Please wait while we process your request",
      imageUrl: "img/PoPlogo.jpg",
      imageWidth: 90,
      imageHeight: 90,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    emailjs.send(
      "service_v5cdgnj",
      "template_gukob4t",
      {
        name: form.name.value,
        email: form.email.value,
        destination: form.destination.value,
        from_date: form.from_date.value,
        to_date: form.to_date.value,
        people: form.people.value,
        message: form.message.value
      }
    )
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Booking Received 🌴",
        text: "Thank you for choosing Pocket of Paradise. A confirmation email has been sent.",
        imageUrl: "img/PoPlogo.jpg",
        imageWidth: 100,
        imageHeight: 100,
        confirmButtonText: "Awesome!",
        confirmButtonColor: "#0d6efd"
      });

      form.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while sending your booking. Please try again.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc3545"
      });
    });
  });

});