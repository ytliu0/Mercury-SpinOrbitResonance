// Given the mean anomaly M and eccentricity e, compute the eccentric anomaly E, distance 
// from the sun r (in units of semi-major axis a) and true anomaly theta. 
// M, E, and theta are all in radians.
//
// E and M are related by Kepler's equation E - e sin E = M. 
// This code has been tested for a number of e's with e < 1
// and works well even for e very close to 1. An integer multiples of 2 pi is
// subtracted from M to create a new variable Mp so that -pi <= Mp < pi. Kepler's
// equation Ep - e sin Ep = Mp is solved and the same integer multiples of 2 pi is
// added to Ep to produce E. Kepler's equation is solved primilarily by Newton's
// method. For e < 0.8, the initial guess is E = M. For e > 0.8, this
// initial guess does not always work well, and E = pi is used instead, as sugested
// in Astronomy on the Personal Computer by Montenbruck and Pfleger. However, even
// this new guess does not guarantee convergence within 100 iterations. When 100 iterations
// is reached, the solver quits and the equation is solved by the method of bisection.
// It is easy to see that when Mp < 0, -pi <= Ep < 0; when Mp > 0, 0 < Ep < pi and
// the bisection method can always find the root with an accuracy of 1.7e-16 after
// 54 iterations.
void rthetaE(double M, double e, double &r, double &theta, double &E)
{
  // mean anomaly -> [-pi, pi)
  double n2pi = floor(M/(2.0*M_PI) + 0.5) * (2.0*M_PI);
  double Mp = M - n2pi;

  // Solve Kepler's equation E - e sin E = M using Newton's iteration method 
  E = Mp; // initial guess
  if (e > 0.8) E = M_PI; // need another initial guess for very eccentric orbit
  double E0 = E*1.01;
  double tol = 1.e-15;
  int iter = 0, maxit = 100;
  while (fabs(E-E0) > tol && iter < maxit) {
    E0 = E;
    E = E0 - (E0 - e*sin(E0) - Mp)/(1.0 - e*cos(E0));
    iter++;
  }
  if (iter==maxit) {
    // Newton's iteration doesn't converge after 100 iterations, use bisection instead.
    iter = 0; maxit = 60;
    if (Mp > 0.0) {
      E0 = 0.0; E = M_PI;
    } else {
      E = 0.0; E0 = -M_PI;
    }
    while (E-E0 > tol && iter < maxit) {
      double E1 = 0.5*(E+E0);
      double z = E1 - e*sin(E1) - Mp;
      if (z > 0.0) {
        E = E1;
      } else {
        E0 = E1;
      }
      iter++;
    }
    if (iter==maxit) {
      printf("Cannot find the root of Kepler's equation in rthetaE!\n");
      printf("Maybe the requested tolerant is too small.\n");
      exit(1);
    }
  }

  r = 1.0 - e*cos(E);
  double x = cos(E) - e;
  double y = sqrt(1.0-e*e) * sin(E);
  theta = atan2(y,x);
  E += n2pi;
  theta += n2pi;
}
