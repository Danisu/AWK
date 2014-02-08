#!/bin/awk -f

#This function takes array and its length as an argument
#and returns the replication string
function dnaReplication(arr, arrSize){
	
	#replicated or complimented dna string
	repString = "";
	
	#Replication
	for(i = 1; i <= arrSize; i++){
		seq = arr[i];
		if (seq == "a" || seq == "A"){
			repString = repString "T";
		}
		else if (seq == "g" || seq == "G"){
			repString = repString "C";
		}
		else if (seq == "t" || seq == "T"){
			repString = repString "A";
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

#This routine takes fasta files or strings of DNA and prints out
#the DNA replication version
BEGIN {
	print "-------START-------";
}
{
	#Condition: do not grab name description
	#or grab DNA string only
	if ($0 !~ /^>/) {
		print $0;
		i = split($0, array, "");
		print "#Replicated Sequence";
		print dnaReplication(array, i);
		print RS;
	}else{
		#sequence name
		print $0;
	}
}
END {
	print "--------END--------";
	exit;
}
