function submitReview(event){
    event.preventDefault();
    let name = document.getElementById("name").value;
    let rating = document.getElementById("rating").value;
    let comment = document.getElementById("comment").value;
    alert(name + ", thank you for your feedback. We're constantly trying to improve our services, so your input is valuable. We'll look closely at what you've said and see how we can improve things.");
    document.getElementById("review-form").reset();
}