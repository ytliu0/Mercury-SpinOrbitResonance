/* Computation of Mercury's orbit and comapre with its spin
    Written by Yuk Tung Liu in April 2014 */

#include <cmath>
#include <cstdlib>
#include <iostream>
#include <fstream>
#include <iomanip>
#include "Kepler.h"

using namespace std;

int main(int argc, char* argv[])
{
  if (argc != 2) {
     printf("\nUsage: ./Mercury-SpinOrbit <n>\n"); 
     printf("This code computes Mercury's orbital and rotational motions\n");
     printf("from time t=-0.5 to t=1.5 in units of orbital period (Mercury passes\n");
     printf("perihelion at t=0). The integer n is the number of output data.\n");
     exit(1);
  }
  double t1 = -0.5;
  double t2 = 1.5;
  int n = atoi(argv[1]);
  // Sanity check
  if (n < 2) {
    printf("The input parameter n = %d; n must be greater than 1\n",n);
    exit(1);
  }

  // allocate array for theta
  double *theta_arr;
  theta_arr = new (nothrow) double[n];
  if (!theta_arr) {
    printf("Error in allocating array theta_arr!\n");
    return 1;
  }
    
  printf("\nThis code computes Mercury's orbital and rotational motions\n");
  printf("from time t=-0.5 to t=1.5 orbital periods (including -0.5 but excluding 1.5). \n");
  printf("The output data can be used to analyze the spin-orbit resonance,\n");
  printf("and make movies.\n\n");
  printf("In the following, Porb is Mercury's orbital period. x and y are Mercury's\n");
  printf("position in a coordinate system where the sun is at the origin. a is\n");
  printf("Mercury's orbital semi-major axis. The origin of time is set so that\n");
  printf("Mercury is at perihelion at t=0. A point on Mercury's surface is chosen\n");
  printf("so that at t=0, the point is facing directly at the sun (the subsolar point).\n");
  printf("phi is the phase angle (in radians) of this point measured from the x-axis.\n");
  printf("Since Mercury's rotation period P_rot = (2/3)Porb, phi(t) = pi + omg_rot t,\n");
  printf("where omg_rot = 2 pi / P_rot = 3 pi/Porb. H is the hour angle (in radians)\n");
  printf("of the sun from the chosen point. It is easy to show that\n");
  printf("H = phi - pi - theta, where theta is the true anomaly of Mercury.\n");
  printf("Hdot is the time derivative of H, which is equal to the difference between\n");
  printf("the rotational angular velocity and orbital angular velocity.\n");
  printf("The tilt of Mercury's spin axis, which is 7 degrees, with respect to its\n");
  printf("orbital angular momentum is ignored in this calculation.\n\n");

  // Output to file "Mercury-SpinOrbit.dat"
  ofstream  datf("Mercury-SpinOrbit.dat");
  datf << "# This code computes Mercury's orbital and rotational motions" << endl;
  datf << "# from time t=-0.5 to t=1.5 orbital periods (including -0.5 but excluding 1.5)." << endl;
  datf << "# The output data can be used to analyze the spin-orbit resonance," << endl;
  datf << "# and make movies." << endl;
  datf << "#" << endl;
  datf << "# In the following, Porb is Mercury's orbital period. x and y are Mercury's" << endl;
  datf << "# position in a coordinate system where the sun is at the origin. a is" << endl;
  datf << "# Mercury's orbital semi-major axis. The origin of time is set so that" << endl;
  datf << "# Mercury is at perihelion at t=0. A point on Mercury's surface is chosen" << endl;
  datf << "# so that at t=0, the point is facing directly at the sun (the subsolar point)." <<endl;
  datf << "# phi is the phase angle (in radians) of this point measured from the x-axis." << endl;
  datf << "# Since Mercury's rotation period P_rot = (2/3)Porb, phi(t) = pi + omg_rot t," << endl;
  datf << "# where omg_rot = 2 pi / P_rot = 3 pi/Porb. H is the hour angle (in radians)" << endl;
  datf << "# of the sun from the chosen point. It is easy to show that" << endl;
  datf << "# H = phi - pi - theta, where theta is the true anomaly of Mercury." << endl;
  datf << "# Hdot is the time derivative of H, which is equal to the difference between" << endl;
  datf << "# the rotational angular velocity and orbital angular velocity." << endl;
  datf << "# The tilt of Mercury's spin axis, which is 7 degrees, with respect to its" << endl;
  datf << "# orbital angular momentum is ignored in this calculation." << endl;
  datf << "#" << endl;

  // Eccentricity from http://nssdc.gsfc.nasa.gov/planetary/factsheet/mercuryfact.html
  double e = 0.20563069;

  // Mercury's spin angular velocity in units of rad/orbital period
  double omg_rot = 2.0*M_PI*1.5;
  // mean angular radius of the sun
  // double mean_ang_radius_sun = 6.95508e8/(1.49597870691e11*0.3871); 

  double dt = (t2-t1)/n; // time spacing (in units of orbital period)
  double s1_e2 = sqrt(1.0-e*e); // sqrt(1-e^2)
  printf("Number of output data is %d, from t/Porb = %g to %g\n\n",n,t1,t2);
  datf << "# Number of output data is " << n << ", from t/Porb = " << t1 << " to "
       << t2 << endl;
  datf << "#" << endl;
  cout << setw(14) << "t/Porb" << setw(14) << "x/a" << setw(14) << "y/a" 
       << setw(14) << "phi" << setw(14) << "H  " << setw(14) << "Hdot Porb/(2pi)" << endl;
  cout << "--------------------------------------------------------------------------------------" << endl;
  datf << "#" << setw(13) << "t/Porb" << setw(14) << "x/a" << setw(14) << "y/a"
       << setw(14) << "phi" << setw(14) << "H  " << "Hdot Porb/(2pi)" << endl;
  datf << "#-------------------------------------------------------------------------------------" << endl;
  for (int i=0; i<n; i++) {
    double t = i*dt+t1; // time (in units of orbital period)
    double M = 2.0*M_PI*t; // Mean anomaly in rad (assume M=0 at t=0).
    // r: distance from the sun in units of orbital semi-major axis
    // theta: true anomaly in rad, E: eccentric anomaly in rad
    double r,theta,E;
    rthetaE(M,e,r,theta,E);
    theta_arr[i] = theta;
    // (x,y) position of Mercury. The sun is at the origin.
    double x = r*cos(theta), y = r*sin(theta);
    // phi: phase angle of a point on Mercury facing the sun at t=0,
    //      measured from the positive x-axis
    double phi = omg_rot*t + M_PI;
    // Hour angle of the sun measured at the point 
    // on Mercury facing the sun at t=0. 
    double H = phi - M_PI - theta;
    // Hdot * Porb/(2pi)
    double HdotPorb_2pi = 1.5 - s1_e2/(r*r);
    // double ang_radius_sun = mean_ang_radius_sun/r; // ang radius of the sun
    cout << setprecision(6) << setw(14) << t << setw(14) << x 
         << setw(14) << y << setw(14) << phi << setw(14) 
         << H << setw(14) << HdotPorb_2pi << endl;
    datf << setprecision(6) << setw(14) << t << setw(14) << x
         << setw(14) << y << setw(14) << phi << setw(14)
         << H << setw(14) << HdotPorb_2pi << endl;
    // datf << setprecision(6) << setw(14) << t << setw(14) << r
    //      << setw(14) << phi << setw(14) << H << setw(14) << ang_radius_sun
    //      << setw(14) << HdotPorb_2pi << endl;
  }
  // output the arrays E_arr and theta_arr (for JavaScript)
  datf << "# output the array theta_arr (for JavaScript)" << endl;
  datf << "# var theta_arr = [" << theta_arr[0];
  for (int i=1; i<n; i++) {
     datf << ", " << theta_arr[i];
  }
  datf << "];" << endl;
  datf.close();
  delete [] theta_arr;
  printf("\nData have been outputted to file Mercury-SpinOrbit.dat\n\n");

  return 0;
}
