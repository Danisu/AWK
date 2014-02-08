#!/bin/awk -f

#Script checks for comments // in different files


#remove the comment
function sortOutComments(){
	#local variable to hold the line
	aString ="";
	
	#Check all the field of the records
	for (i=1; i <=NF; i++) {
	
		#Condition if the field has //
		if ($i ~ /\/\//){
			#local variable to hold the field, i.e., {//Comment
			bString = "";
			
			#split the field
			n = split($i, a, "");
			if (a[1] != "/"){
				for (j=1; j <=n; j++) {
					#Breaks the field when the comment occurs
					 if(a[j] == "/" && a[j+1] == "/"){
					 	break;
					 }
					 bString = bString "" a[j];
				}
				aString = aString " " bString;
			}
			break;
		}else{ #print rest of the code
			aString = aString " " $i;
		}
	}
	return aString;
}

BEGIN{}
{
	if ($0 ~ /\/\//){
		#This still needs improvement
		#Exception: Cannot recognize var a = " // This is a javascript comment
		if ($0 ~ /\"/ || $0 ~ /\'/){
			print $0;
		}else{ #remove comments
			#Remove empty lines
			if(sortOutComments() == ""){}
			else{
				print sortOutComments();
			}
		}
	}
	else{
		#Remove empty lines
		if(NF == 0){
		}
		else{
			print $0;
		}
	}
}

END{}