$(document).ready(function() 
{
		$("#alertSuccess").hide();
	    $("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {

	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateStockForm();
	if (status != true)
	{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	
	// If valid------------------------
	var type = ($("#hidStockIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "StocksAPI",
		type : type,
		data : $("#formStock").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onItemSaveComplete(response.responseText, status);
		}
	});
});

function onStockSaveComplete(response, status) 
{
	if (status == "success") 
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success") 
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") 
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
		
	} else if (status == "error") 
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else 
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	
	$("#hidStockIDSave").val("");
	$("#formStock")[0].reset();
}
// UPDATE==========================================
$(document).on("click", ".btnUpdate",function(event) 
		{
			$("#hidStockIDSave").val(
					$(this).closest("tr").find('#hidStockIDUpdate').val());
			$("#sname").val($(this).closest("tr").find('td:eq(0)').text());
			$("#quantity").val($(this).closest("tr").find('td:eq(1)').text());
			$("#expDate").val($(this).closest("tr").find('td:eq(2)').text());
			$("#recDate").val($(this).closest("tr").find('td:eq(3)').text());
		});



// REMOVE ====================================================
$(document).on("click", ".btnRemove", function(event) 
{
	$.ajax(
	{
		url : "StocksAPI",
		type : "DELETE",
		data : "StockID=" + $(this).data("stockid"),
		dataType : "text",
		complete : function(response, status) 
		{
			onItemDeleteComplete(response.responseText, status);
		}
	});
});
function onStockDeleteComplete(response, status) 
{
	if (status == "success") 
	{
		
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success") 
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			
			$("#divStocksGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
		
	} else if (status == "error")
	{
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else
	{
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// CLIENTMODEL=========================================================================
function validateStockForm() {
	// Name
	if ($("#sname").val().trim() == "") {
		return "Insert Stock Name.";
	}
	// Quantity-------------------------------
	if ($("#quantity").val().trim() == "") {
		return "Insert Stock quantity";
	}
	// is numerical value
	var tmpPrice = $("#quantity").val().trim();
	if (!$.isNumeric(tmpPrice)) {
		return "Insert a numerical value for quantity.";
	}
	// convert to decimal price
	$("#quantity").val(parseFloat(tmpPrice).toFixed(2));

	// Expiry Date------------------------
	if ($("#expdate").val().trim() == "") {
		return "Insert Stock Expiry Date.";
	}
	
	// Received Date
	if ($("#recDate").val().trim() == "") {
		return "Insert Stock Received Date.";
	}
	return true;

}
