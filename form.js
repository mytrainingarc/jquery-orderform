$(document).ready(function () {

    // validate info 
    $('#name').blur(function () {
      validateName();
    });
  
    $('#email').blur(function () {
      validateEmail();
    });
  
    $('#address').blur(function () {
      validateAddress();
    });
  
    $('#city').blur(function () {
      validateCity();
    });
  
    $('#zip').blur(function () {
      validateZip();
    });
  
    $('#email2').blur(function () {
      validateEmail2();
    });
  
    $('#shipaddr').blur(function () {
      validateShipAddr();
    });
  
    $('#shipcity').blur(function () {
      validateShipCity();
    });
  
    $('#shipzip').blur(function () {
      validateShipZip();
    });
  
    // validates fields
    function validateName() {
      let name = $('#name').val();
      if (name.trim() === '') {
        $('#nameErr').text('Name is required.');
      } else {
        $('#nameErr').text('');
      }
    }
  
    function validateEmail() {
      let email = $('#email').val();
      let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        $('#emailErr').text('Please enter a valid email address.');
      } else {
        $('#emailErr').text('');
      }
    }
  
    function validateEmail2() {
      let email1 = $('#email').val();
      let email2 = $('#email2').val();
      if (email1 !== email2) {
        $('#email2Err').text('Emails do not match.');
      } else {
        $('#email2Err').text('');
      }
    }
  
    function validateAddress() {
      let address = $('#address').val();
      if (address.trim() === '') {
        $('#addressErr').text('Address is required.');
      } else {
        $('#addressErr').text('');
      }
    }
  
    function validateCity() {
      let city = $('#city').val();
      if (city.trim() === '') {
        $('#cityErr').text('City is required.');
      } else {
        $('#cityErr').text('');
      }
    }
  
    function validateZip() {
      let zip = $('#zip').val();
      let zipRegex = /^[0-9]{5}$/;
      if (!zipRegex.test(zip)) {
        $('#zipErr').text('Zip code must be a 5 digit number.');
      } else {
        $('#zipErr').text('');
      }
    }
  
    function validateShipAddr() {
      let shipAddr = $('#shipaddr').val();
      if (shipAddr.trim() === '') {
        $('#shipaddrErr').text('Shipping address is required.');
      } else {
        $('#shipaddrErr').text('');
      }
    }
  
    function validateShipCity() {
      let shipCity = $('#shipcity').val();
      if (shipCity.trim() === '') {
        $('#shipcityErr').text('Shipping city is required.');
      } else {
        $('#shipcityErr').text('');
      }
    }
  
    function validateShipZip() {
      let shipZip = $('#shipzip').val();
      let zipRegex = /^[0-9]{5}$/;
      if (!zipRegex.test(shipZip)) {
        $('#shipzipErr').text('Shipping zip code must be a 5 digit number.');
      } else {
        $('#shipzipErr').text('');
      }
    }
  
    // copy checkbox
    $('#copy').change(function () {
      if ($(this).prop('checked')) {
        $('#shipaddr').val($('#address').val());
        $('#shipcity').val($('#city').val());
        $('#shipzip').val($('#zip').val());
        $('#shipstate').val($('#state').val());
      } else {
        $('#shipaddr').val('');
        $('#shipcity').val('');
        $('#shipzip').val('');
        $('#shipstate').val('TX'); // default
      }
    });
  
    // order calc and function must add loop 
    $('.qty').blur(function () {
      calculateOrderTotal();
    });
  
    function calculateOrderTotal() {
      let orderTotal = 0;
  
      $('.qty').each(function () {
        let id = $(this).attr('id');
        let qty = $(this).val();
        if (isNaN(qty) || qty < 0) qty = 0; // not valid = 0
  
        let price = parseFloat($('#price' + id).text());
        let total = price * qty;
        $('#total' + id).text(total.toFixed(2));
  
        orderTotal += total; 
      });
  
      // sub total and state tax calc
      $('#subt').text(orderTotal.toFixed(2));
  
      let tax = 0;
      let state = $('#shipstate').val();
      if (state === 'TX') {
        tax = orderTotal * 0.08;
      }
      $('#tax').text(tax.toFixed(2));
  
      orderTotal += tax;
  
      // shipping fees
      let shipping = 0;
      if (state === 'TX') {
        shipping = 5.00;
      } else if (state === 'CA' || state === 'NY') {
        shipping = 20.00;
      } else {
        shipping = 10.00;
      }
      $('#ship').text(shipping.toFixed(2));
  
      orderTotal += shipping;
  
      $('#gTotal').text(orderTotal.toFixed(2));
    }
  
  });
  