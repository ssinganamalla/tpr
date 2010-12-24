<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<form action="http://www.starbuzzcoffee.com/processorder.php" method="POST">
<table>
<tr>
<th>Choose your beans:</th>
<td>
<select name="beans">
<option value="House Blend">House Blend</option>
<option value="Bolivia">Shade Grown Bolivia Supremo</option>
<option value="Guatemala">Organic Guatemala</option>
<option value="Kenya">Kenya</option>
</select>
</td>
</tr>
<tr>
<th>Type:</th>
<td>
<input type="radio" name="beantype" value="whole" />
Whole bean
<br />
<input type="radio" name="beantype" value="ground" checked="checked" />
Ground
</td>
</tr>
<tr>
<th>Extras:</th>
<td>
<input type="checkbox" name="extras[]" value="giftwrap" />
Gift wrap
<br />
<input type="checkbox" name="extras[]" value="catalog" checked="checked" />
Include catalog with order
</td>
</tr>
<tr>
<th>Ship to:</th>
<td>
<table>
<tr>
<td>Name:</td>
<td>
<input type="text" name="name" value="" /> <a href="#" class="hintanchor" onMouseover="showhint('Please choose a username. Should consist of alphanumeric characters only.', this, event, '150px')">[?]</a>
</td>
</tr>
<tr>
<td>Address:</td>
<td>
<input type="text" name="address" value="" />
</td>
</tr>
<tr>
<td>City:</td>
<td>
<input type="text" name="city" value="" />
</td>
</tr>
<tr>
<td>State:</td>
<td>
<input type="text" name="state" value="" />
</td>
</tr>
<tr>
<td>Zip:</td>
<td>
<input type="text" name="zip" value="" />
</td>
</tr>
</table>
</td>
</tr>
<tr>
<th>Customer Comments:</th>
<td>
<textarea name="comments" rows="10" cols="48"></textarea>
</td>
</tr>
<tr>
<th></th>
<td><input type="submit" value="Order Now" /></td>
</tr>
</table>
</form>
</body>
</html>