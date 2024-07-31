// $(document).ready(function() {
//     $('input').on('input', function() {
//       var inputData = {
//         taluka: $('#taluka').val(),
//         school: $('#school').val(),
//         sClass: $('#sClass').val(),
//         group: $('#group').val(),
//         hod: $('#hod').val(),
//         supV: $('#supV').val(),
//         kTai: $('#kTai').val(),
//       };
//       $.ajax({
//         type: 'POST',
//         url: '/dashboardHome/:userId/dashboardCRoom/attForm/studList',
//         data: inputData,
//         success: function(response) {
//           console.log('Data submitted successfully:', response);
//         },
//         error: function(error) {
//           console.error('Error submitting data:', error);
//         }
//       });
//     });
//   });