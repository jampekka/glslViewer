uniform vec2 u_resolution;
uniform float u_time;

void main() {
	float size = min(u_resolution.x, u_resolution.y);
	vec2 pos = (gl_FragCoord.xy - u_resolution.xy/2.0)/(size/2.0);
	if(abs(pos.x) > 1.0 || abs(pos.y) > 1.0) {
		discard;
	}
	
	float val = 0.0;
	float angle = u_time*3.0;
	float path_radius = 0.5;
	vec2 center = vec2(sin(angle), cos(angle))*path_radius;
	
	float circle_radius = 100.0;
	float r = length(center - pos);
	float pr = r*size;
	val = cos(pr/circle_radius*3.14*2.0*3.5);
	float aaf = fwidth(val);
	val = smoothstep(-aaf, aaf, val);
	val *= smoothstep(-aaf, aaf, circle_radius - r*size);
	
	val = (val + 1.0)/2.0;
	gl_FragColor = vec4(vec3(val), 1.0);
}
