function [result, found_rad] = restore(g)
    [m, n] = size(g);
    
    eps = 10^100;
    result = zeros(m, n);
    found_rad = 0;
    for r = 1:20
        f = ifft2(fft2(g) ./ fft2(H(g, r)));
        delta = 0;
        
        for i = 2:1:m - 1
            for j = 2:1:n - 1
                d1 = abs(f(i-1, j) - f(i, j));
                d2 = abs(f(i+1, j) - f(i, j));
                d3 = abs(f(i, j-1) - f(i, j));
                d4 = abs(f(i, j+1) - f(i, j));
                delta = delta + d1 + d2 + d3 + d4;
            end
        end
        
        if(eps > delta)
            eps = delta;
            result = f;
            found_rad = r;
        end
    end
    found_rad
end