<!DOCTYPE html>
<html>
<body>
	<?php
		// servername => localhost
		// username => root
		// password => empty
		// database name => staff
 		$conn = mysqli_connect("localhost", "root", "123", "dbreports");
		// Check connection
		if($conn === false){
			die("ERROR: Could not connect. ". mysqli_connect_error());
    	}
    	// Taking all 5 values from the form data(input)
		$formSUMNAME =  $_REQUEST['formSUMNAME'];
		$formREGION = $_REQUEST['formREGION'];
    	$formDETAILS =  $_REQUEST['formDETAILS'];
		$formFILES = $_REQUEST['formFILES'];
          
		// Performing insert query execution
		$sql = "INSERT INTO tbsubmissions VALUES ('ID','TIMESTAMP','$formSUMNAME','$formREGION','$formDETAILS','$formFILES')";
		if(mysqli_query($conn, $sql)){
			echo "<h3>data stored in a database successfully." 
				. " Please browse your localhost php my admin" 
				. " to view the updated data</h3>"; 
  		
        	echo nl2br("\n$formSUMNAME\n $formREGION\n "
				. "$formDETAILS");
        } else{
            echo "ERROR: Hush! Sorry $sql. " 
                . mysqli_error($conn);
        }
          
        // Close connection
        mysqli_close($conn);
        ?>
</body>
</html>