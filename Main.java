package code;

import java.util.ArrayList;
import java.util.Random;
import java.util.List;
import java.util.LinkedList;

public class Main {

	public static void main(String[] args)
	{
		mutate();
	}
	
	public static void mutate()
	{
		Random r=new Random();
		ArrayList<String> ops=new ArrayList<String>();
		ops.add("+");
		ops.add("-");
		ops.add("*");
		ops.add("/");
		ops.add("^");
		ArrayList<String> nums=new ArrayList<String>();
		for(int i=1; i<=9; i++)
		{
			nums.add(""+i);
		}
		
		ArrayList<String> str=new ArrayList<String>();
		str.add("+ 3");
		str.add("- 1");
		str.add("/ 2");
		str.add("* 5");
		str.add("^ 2");
		int probability=r.nextInt(5);
		System.out.println(probability);
		for(int i=0; i<str.size(); i++)
		{
			System.out.println(str.get(i));
		}
		if(probability>2)
		{
			int mutated=r.nextInt(str.size());
			int op=r.nextInt(ops.size());
			int num=r.nextInt(nums.size());
			System.out.println();
			System.out.println(mutated);
			System.out.println(op);
			System.out.println(num);
			str.set(mutated, ops.get(op)+" "+nums.get(num));
		}
		for(int i=0; i<str.size(); i++)
		{
			System.out.println(str.get(i));
		}
	}
	  public LinkedList<String> Splice(ArrayList<List<String>> children){
	  ArrayList<List<String>> splicedfront = new ArrayList<List<String>>();
	  ArrayList<List<String>> splicedback = new ArrayList<List<String>>();
	  ArrayList<List<String>> splicedproduct = new ArrayList<List<String>>();
	  
	  ArrayList<List<String>> indexf = new ArrayList<List<String>>();
	  ArrayList<List<String>> indexb = new ArrayList<List<String>>();
	  //List<String> splicelist = new List<String>();
	  int x = rand.nextInt(3)+1;
	  for (int element = 0; element < 4; element++) {
		  ArrayList<List<String>> splicedf = new ArrayList<List<String>>();
		  splicedf.add(children.get(element).subList(0, x));
		  //creates a sublist of spliced lists
		  splicedfront.addAll(splicedf);
		  //List<String> splicelist = children.subList(0, 5);
		  ArrayList<List<String>> splicedb = new ArrayList<List<String>>();
		  splicedb.add(children.get(element).subList(x+1, 5));
		  splicedback.addAll(splicedb);
		  //adds spliced sublists to an arraylist spliced product
		  //TODO need to write the merge functions
	  }
	  //merge function
	  for (int i = 0; i<splicedfront.size(); i++){
		  int randelement = rand.nextInt(splicedfront.size());
		  indexf.add(splicedfront.get(i));
		  indexb.add(splicedback.get(randelement));
		  for(List<String> element:splicedfront){
			  List<String> buffer = new ArrayList<String>();
			  for(String e: element){
				  buffer.add(e);
			  }
			  for(String e: splicedback.get(0)){
				  buffer.add(e);
			  }
			  splicedproduct.add(buffer);
			  splicedback.remove(0);
		  }
		  
			  
			  
		  }
		  		  
	  }
	  
	  public ArrayList<List<String>> retInOrder(ArrayList<List<String>> Lof(int start,int goal){
  			for(LinkedList<String> los:lofl){
  				int soFar = start;
  				for(String s:los){
  					soFar = operate(soFar,s);
  					if(soFar == goal){
  						break;
  					}
  					los.addLast(Math.abs(soFar-goal).ToString());
		  }
		ArrayList<List<String>> retList = new ArrayList<List<String>>();
		while(lofl.size()>0){
			int lowdiff = Integer.MAX_VALUE;
				for(LinkedList<String> los:lofl){
					if(los.getLast()<lowdiff){
						lowdiff = los.getLast();
						addNext = los;
				}	
		}
				retlist.AddLast(addNext);
				lofl.remove(addNext);
		}
		return retlist;
  			}
  		}
}
