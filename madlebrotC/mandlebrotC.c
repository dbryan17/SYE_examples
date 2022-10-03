int madlebrot(int x, int y)
{
  int c_r = x;
  int c_i = y;
  float z_r = 0.0;
  float z_i = 0.0;
  // 33 iterations
  for (int i = 1; i < 33; i++)
  {
    float z_r2 = (z_r * z_r) - (z_i * z_i) + c_r;
    z_i = (2 * z_r * z_i) + c_i;
    z_r = z_r2;
    if (((z_r * z_r) + (z_i * z_i)) > 4)
    {
      return i;
    }
  }
  return 0;
}
