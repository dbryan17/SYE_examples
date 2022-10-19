#include <stdio.h>
#include <stdlib.h>

int mandlebrot(double x, double y);
int getIdx(int x, int y, int width, int color);

int main()
{

  int width = 3840;
  int height = 2160;

  // smallint - want 8 bit?
  // int pixelData[width * height * 4];
  long long array_length = width * height * 4;
  int *pixel_data = (int *)malloc(array_length * sizeof(int));

  for (int x = 0; x < width; x++)
  {
    for (int y = 0; y < height; y++)
    {

      double new_x = (x - width / 2.) / (height / 2.) - 0.55;
      double new_y = (y - height / 2.) / (height / 2.);

      int iterations = mandlebrot(new_x, new_y);

      pixel_data[getIdx(x, y, width, 1)] = iterations * 8;
      pixel_data[getIdx(x, y, width, 3)] = 255;

      // printf("%d ", x);
      // printf("%d ", y);
      // printf("%d\n", iterations * 8);
        }
  }

  for (int i = 0; i < array_length; i++)
  {
    printf("%d\n", pixel_data[i]);
  }

  return 0;
}

int mandlebrot(double x, double y)
{
  double c_r = x;
  double c_i = y;
  double z_r = 0.0;
  double z_i = 0.0;
  // 32 iterations

  // get x and y values for when this is off by 1
  for (int i = 1; i < 33; i++)
  {
    double z_r2 = (z_r * z_r) - (z_i * z_i) + c_r;
    z_i = (2 * z_r * z_i) + c_i;
    z_r = z_r2;
    if (((z_r * z_r) + (z_i * z_i)) > 4)
    {
      return i;
    }
  }
  return 0;
}

int getIdx(int x, int y, int width, int color)
{
  int red = y * (width * 4) + x * 4;
  return red + color;
}
