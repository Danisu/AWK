#!/bin/awk -f

#This function takes array(DNA) and its length as an argument
#and returns the translated(RNA) string
function dnaReplication(arr, arrSize){
	
	#RNA string
	repString = "";
	
	#Translation
	for(i = 1; i <= arrSize; i++){
		seq = arr[i];
		if (seq == "a" || seq == "A"){
			repString = repString "T";
		}
		else if (seq == "g" || seq == "G"){
			repString = repString "C";
		}
		else if (seq == "t" || seq == "T"){
			repString = repString "U";
		}
		else if (seq == "c" || seq == "C"){
			repString = repString "G";
		}
		else{
			print "ERROR: The DNA sequence can only contain A G T and C Nucleic Acid Code. Not " seq;
			print "ERROR at line: " NR;
			exit;
		}
	}
	return repString;
}

#This routine takes DNA sequence files or DNA strings prints out
#the RNA sequence
BEGIN {
	print "-------START-------";
}
{
		print $0;
		i = split($0, array, "");
		print "#RNA Sequence";
		print dnaReplication(array, i);
		print RS;
}
END {
	print "--------END--------";
	exit;
}