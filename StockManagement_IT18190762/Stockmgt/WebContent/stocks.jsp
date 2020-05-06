<%@page import="com.Stock"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Stocks Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/stocks.js"></script>
</head>
<body>
<div class="container">
<div class="row">
<div class="col-6">
		<h1>Stocks Management</h1>

		<form id="formStock" name="formStock">
				sname:
				<input id="sname" name="sname" type="text"
								class="form-control form-control-sm">

				<br> quantity:
				<input id="quantity" name="quantity" type="text"
								class="form-control form-control-sm">

				<br> expDate:
				<input id="expDate" name="expDate" type="text"
								class="form-control form-control-sm">

				<br> recDate:
				<input id="recDate" name="recDate" type="text"
								class="form-control form-control-sm">

				<br>
				<input id="btnSave" name="btnSave" type="button" value="Save"
								class="btn btn-primary">
				<input type="hidden" id="hidStockIDSave"
								name="hidItemIDSave" value="">
		</form>

		<div id="alertSuccess" class="alert alert-success"></div>
		<div id="alertError" class="alert alert-danger"></div>

		<br>
		<div id="divItemsGrid">
				<%
						Stock itemObj = new Stock();
						out.print(itemObj.readStocks());
				%>
		</div>

		</div>
		</div>
	</div>
	
</body>
</html>