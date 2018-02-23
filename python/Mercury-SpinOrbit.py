#! /usr/bin/env python

from Kepler import rthetaE
from numpy import sin, cos, sqrt, pi
from sys import argv, exit

argc = len(argv)
if argc != 2:
   print "\nUsage: ./Mercury-SpinOrbit.py <n>"
   print "This code computes Mercury's orbital and rotational motions"
   print "from time t=-0.5 to t=1.5 orbital periods (including -0.5 but excluding 1.5)."
   print "The output data can be used to analyze the spin-orbit resonance and make movies.\n"
   exit()

# Assign input parameters to variables
t1 = -0.5
t2 = 1.5
n = int(argv[1])

# Sanity check
if n<2:
   print "The input parameter n =",n," must be greater than 1"
   exit()

# Array theta_arr for JavaScript code
theta_arr = []

print "\nThis code computes Mercury's orbital and rotational motions"
print "from time t=-0.5 to t=1.5 orbital periods (including -0.5 but excluding 1.5)."
print "The output data can be used to analyze the spin-orbit resonance and make movies.\n"
print "In the following, Porb is Mercury's orbital period. x and y are Mercury's"
print "position in a coordinate system where the sun is at the origin. a is"
print "Mercury's orbital semi-major axis. The origin of time is set so that"
print "Mercury is at perihelion at t=0. A point on Mercury's surface is chosen"
print "so that at t=0, the point is facing directly at the sun (the subsolar point)."
print "phi is the phase angle (in radians) of this point measured from the x-axis."
print "Since Mercury's rotation period P_rot = (2/3)Porb, phi(t) = pi + omg_rot t,"
print "where omg_rot = 2 pi / P_rot = 3 pi/Porb. H is the hour angle (in radians)"
print "of the sun from the chosen point. It is easy to show that"
print "H = phi - pi - theta, where theta is the true anomaly of Mercury."
print "Hdot is the time derivative of H, which is equal to the difference between"
print "the rotational angular velocity and orbital angular velocity."
print "The tilt of Mercury's spin axis, which is 7 degrees, with respect to its"
print "orbital angular momentum is ignored in this calculation.\n"

# Output to file "Mercury-SpinOrbit.dat"
datf = open('Mercury-SpinOrbit.dat','w')
datf.write("# This code computes Mercury's orbital and rotational motions\n")
datf.write("# from time t=-0.5 to t=1.5 orbital periods (including -0.5 but excluding 1.5).\n")
datf.write("# The output data can be used to analyze the spin-orbit resonance and make movies.\n")
datf.write("#\n")
datf.write("# In the following, Porb is Mercury's orbital period. x and y are Mercury's\n")
datf.write("# position in a coordinate system where the sun is at the origin. a is\n")
datf.write("# Mercury's orbital semi-major axis. The origin of time is set so that\n")
datf.write("# Mercury is at perihelion at t=0. A point on Mercury's surface is chosen\n")
datf.write("# so that at t=0, the point is facing directly at the sun (the subsolar point).\n")
datf.write("# phi is the phase angle (in radians) of this point measured from the x-axis.\n")
datf.write("# Since Mercury's rotation period P_rot = (2/3)Porb, phi(t) = pi + omg_rot t,\n")
datf.write("# where omg_rot = 2 pi / P_rot = 3 pi/Porb. H is the hour angle (in radians)\n")
datf.write("# of the sun from the chosen point. It is easy to show that\n")
datf.write("# H = phi - pi - theta, where theta is the true anomaly of Mercury.\n")
datf.write("# Hdot is the time derivative of H, which is equal to the difference between\n")
datf.write("# the rotational angular velocity and orbital angular velocity.\n")
datf.write("# The tilt of Mercury's spin axis, which is 7 degrees, with respect to its\n")
datf.write("# orbital angular momentum is ignored in this calculation.\n")
datf.write("#\n")

# Eccentricity from http://nssdc.gsfc.nasa.gov/planetary/factsheet/mercuryfact.html
e = 0.20563069

# Mercury's spin angular velocity in units of rad/orbital period
omg_rot = 2.0*pi*1.5
dt = (t2-t1)/n     # time spacing (in units of orbital period)
s1_e2 = sqrt(1.0-e*e)  # sqrt(1-e^2)
print "Number of output data is",n,", from t/Porb =",t1," to",t2,"\n"
datf.write("# Number of output data is "+str(n)+" from t/Porb = "+str(t1)+" to "+str(t2)+"\n")
datf.write("#\n")
outstring = '{:>14s} {:>14s} {:>14s} {:>14s} {:>14s} {:>14s}'.format('t/Porb',\
            'x/a', 'y/a', 'phi', 'H  ', 'Hdot Porb/(2pi)')
print outstring
print '-------------------------------------------------------------------------------------------'
outstring = '#{:>13s} {:>14s} {:>14s} {:>14s} {:>14s} {:>14s}\n'.format('t/Porb',\
            'x/a', 'y/a', 'phi', 'H  ', 'Hdot Porb/(2pi)')
datf.write(outstring)
datf.write('#------------------------------------------------------------------------------------------\n')

for i in range(n):
   t = i*dt+t1  # time (in units of orbital period)
   M = 2.0*pi*t # Mean anomaly in rad (assume M=0 at t=0)
   # r: distance from the sun in units of orbital semi-major axis
   # theta: true anomaly in rad, E: eccentric anomaly in rad
   r,theta,E = rthetaE(M, e)
   theta_arr.append(theta)
   # (x,y) position of Mercury. The sun is at the origin.
   x = r*cos(theta)
   y = r*sin(theta)
   # phi: phase angle of a point on Mercury facing the sun at t=0,
   #      measured from the positive x-axis
   phi = omg_rot*t + pi
   # Hour angle of the sun measured at the point
   # on Mercury facing the sun at t=0.
   H = omg_rot*t - theta
   # Hdot * Porb/(2pi)
   HdotPorb_2pi = 1.5 - s1_e2/(r*r)
   outstring = '{:14.6g} {:14.6g} {:14.6g} {:14.6g} {:14.6g} {:14.6g}'.format(t,x,y,phi,H,HdotPorb_2pi)
   print outstring 
   datf.write(outstring+'\n')  

# output the array theta_arr (for JavaScript)
datf.write('# output the array theta_arr (for JavaScript)\n')
datf.write('# var theta_arr = ['+'{:.6g}'.format(theta_arr[0]))
for i in range(1,n):
   datf.write(', '+'{:.6g}'.format(theta_arr[i]))
datf.write('];\n')
datf.close()
print "\nData have been outputted to file Mercury-SpinOrbit.dat\n"
