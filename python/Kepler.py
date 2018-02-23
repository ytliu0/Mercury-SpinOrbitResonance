#! /usr/bin/env python

## Solve the Kepler's equation E - e sin E = M with e <=0 < 1.
## Written by Yuk Tung Liu in April 2014.
##

from numpy import pi, floor, arctan2, sin, cos, sqrt
from sys import exit

# Given the mean anomaly M and eccentricity e, compute the eccentric anomaly E,
# distance from the sun r (in units of semi-major axis a) and true anomaly theta. 
# M, E, and theta are all in radians.
#
# E and M are related by Kepler's equation E - e sin E = M.
# This code has been tested for a number of e's with e < 1
# and works well even for e very close to 1. An integer multiples of 2 pi is
# subtracted from M to create a new variable Mp so that -pi <= Mp < pi. Kepler's
# equation Ep - e sin Ep = Mp is solved and the same integer multiples of 2 pi is
# added to Ep to produce E. Kepler's equation is solved primilarily by Newton's
# method. For e < 0.8, the initial guess is E = M. For e > 0.8, this
# initial guess does not always work well, and E = pi is used instead, as sugested
# in Astronomy on the Personal Computer by Montenbruck and Pfleger. However, even
# this new guess does not guarantee convergence within 100 iterations. When 100 iterations
# is reached, the solver quits and the equation is solved by the method of bisection.
# It is easy to see that when Mp < 0, -pi <= Ep < 0; when Mp > 0, 0 < Ep < pi and
# the bisection method can always find the root with an accuracy of 1.7e-16 after
# 54 iterations.
def rthetaE(M, e): 
    # mean anomaly -> [-pi, pi)
    n2pi = floor(M/(2.0*pi) + 0.5) * (2.0*pi)
    Mp = M - n2pi   # Mp \in [-pi, pi)
    
    # Solve Kepler's equation E - e sin E = Mp using Newton's iteration method
    E = Mp   # initial guess
    if (e > 0.8): E = pi  # need another initial guess for very eccentric orbit
    E0 = E*1.01
    tol = 1.e-15
    iter = 0
    maxit = 50
    while abs(E-E0) > tol and iter < maxit:
       E0 = E
       E = E0 - (E0 - e*sin(E0) - Mp)/(1.0 - e*cos(E0))
       iter += 1
    if (iter == maxit):
       # Newton's iteration doesn't converge after maxit iterations, use bisection instead.
       #print "#Newton's iteration doesn't converge after",maxit,"iterations..."
       #exit()
       iter = 0
       maxit = 60
       if Mp > 0.0:
          E0 = 0.0
          E = pi
       else:
          E = 0.0
          E0 = -pi
       while E-E0 > tol and iter < maxit:
          E1 = 0.5*(E+E0)
          z = E1 - e*sin(E1) - Mp
          if (z > 0.0):
             E = E1
          else:
             E0 = E1
          iter += 1
       if (iter == maxit):
          print "Cannot find the root of Kepler's equation in rthetaE!"
          print "Maybe the requested tolerant is too small."
          exit()
     
    r = 1.0 - e*cos(E)
    x = cos(E) - e
    y = sqrt(1.0-e*e) * sin(E)
    theta = arctan2(y,x)
    E += n2pi
    theta += n2pi
    return r,theta,E
