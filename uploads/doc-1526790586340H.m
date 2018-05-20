function h = H(image, r)
    [x, y] = size(image);
    h = zeros(x,y);
    for i = 1:x
        for j = 1:y
            if ((i - r - 1)^2 + (j - r - 1)^2 <= r^2)
                h(i, j) = 1 / (pi * r^2);
            else
                h(i, j) = 0;
            end
        end
    end
end