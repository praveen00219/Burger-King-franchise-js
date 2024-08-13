//--------- increase quantity of item------------
document.querySelectorAll(".increase-qty").forEach((button) => {
  button.addEventListener("click", (event) => {
    const quantityInput = event.target
      .closest(".flex")
      .querySelector(".quantity-input");
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });
});

//------------ decrease quantity of item-------------
document.querySelectorAll(".decrease-qty").forEach((button) => {
  button.addEventListener("click", (event) => {
    const quantityInput = event.target
      .closest(".flex")
      .querySelector(".quantity-input");
    if (parseInt(quantityInput.value) > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });
});

//------Event on order food button ------------
document.getElementById("orderButton").addEventListener("click", () => {
  const selectedItems = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  );

  if (selectedItems.length === 0) {
    alert("Please select at least one item.");
    return;
  }

  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("orderDetails").classList.add("hidden");

  // Simulate order processing time with a promise
  new Promise((resolve) => {
    const processingTime = Math.floor(Math.random() * 4000) + 1000; // 1-5 seconds
    setTimeout(() => {
      resolve(selectedItems);
    }, processingTime);
  }).then((items) => {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("orderDetails").classList.remove("hidden");

    // Calculate total cost
    let totalCost = 0;
    items.forEach((item) => {
      const price = parseFloat(item.getAttribute("data-price"));
      const quantityInput = item
        .closest("label")
        .querySelector(".quantity-input");
      const quantity = parseInt(quantityInput.value);
      totalCost += price * quantity;
    });

    // Display Message-1
    const orderIdElement = document.getElementById("orderId");
    orderIdElement.classList.add("text-green-600");
    orderIdElement.textContent =
      "Thank you. Your order has been placed successfully.";

    // After 2 seconds, display Message-2
    setTimeout(() => {
      // Play a sound when get notification
      document.getElementById("orderSoundNotification").play();
      const orderId = Math.floor(Math.random() * 9000000000000) + 1000000000000;
      alert(
        `Your order number is ${orderId}. It will be delivered in 5-10 minutes.`
      );
    }, 2000);

    // After another 6 seconds, hide message
    setTimeout(() => {
      orderIdElement.textContent = ``;
    }, 8000);

    // Clear previous images
    const foodImagesDiv = document.getElementById("foodImages");
    foodImagesDiv.innerHTML = "";

    // Display images and quantities using `map`
    items.map((item) => {
      let foodImageSrc = "";
      const quantity = item
        .closest("label")
        .querySelector(".quantity-input").value;
      switch (item.value) {
        case "Burger":
          foodImageSrc = "/assets/img/burger-img.jpg";
          break;
        case "Fries":
          foodImageSrc = "/assets/img/fries.jpg";
          break;
        case "Coke":
          foodImageSrc = "/assets/img/coke.jpg";
          break;
        case "Nuggets":
          foodImageSrc = "/assets/img/Nuggets.jpg";
          break;
      }

      const img = document.createElement("img");
      img.src = foodImageSrc;
      img.alt = item.value;
      img.classList.add(
        "w-32",
        "h-32",
        "object-cover",
        "rounded-t-lg",
        "shadow-lg"
      );

      const quantityBadge = document.createElement("span");
      quantityBadge.textContent = `Quantity: ${quantity}`;
      quantityBadge.classList.add(
        "text-sm",
        "font-semibold",
        "text-yellow-600",
        "ml-2"
      );

      const imgWrapper = document.createElement("div");
      imgWrapper.appendChild(img);
      imgWrapper.appendChild(quantityBadge);
      imgWrapper.classList.add(
        "flex",
        "flex-col",
        "gap-4",
        "pb-2",
        "items-center",
        "border",
        "rounded-lg",
        "border-gray-300"
      );

      foodImagesDiv.appendChild(imgWrapper);
    });

    // Display total cost
    document.getElementById(
      "totalCost"
    ).textContent = `Total Cost: $${totalCost.toFixed(2)}`;

    // Play a sound when the order is ready
    document.getElementById("orderSound").play();
  });
});
