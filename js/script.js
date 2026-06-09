document.body.style.overflow = 'hidden';

// === LOADER CANVAS (mini engineering drawing) ===
(function() {
  var canvas = document.getElementById('loaderCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w, h, frame = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, w, h);
    frame++;
    var step = w < 480 ? 80 : 50;

    ctx.strokeStyle = 'rgba(240,165,0,0.05)';
    ctx.lineWidth = 0.5;
    for (var x = 0; x < w; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (var y = 0; y < h; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    ctx.save();
    ctx.translate(w * (w < 480 ? 0.25 : 0.2), h * 0.85);
    var s = w < 480 ? 0.5 : 1;
    ctx.scale(s, s);
    ctx.strokeStyle = 'rgba(240,165,0,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -120); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(90, -120); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(-30, -120); ctx.stroke();
    ctx.strokeStyle = 'rgba(240,165,0,0.07)';
    ctx.lineWidth = 0.3;
    for (var i = 0; i < 120; i += 12) {
      ctx.beginPath(); ctx.moveTo(-5, -i); ctx.lineTo(5, -i - 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5, -i); ctx.lineTo(-5, -i - 6); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(240,165,0,0.08)';
    var sx = Math.sin(frame * 0.02) * 3;
    ctx.beginPath(); ctx.moveTo(60, -120); ctx.lineTo(75 + sx, -60); ctx.stroke();
    ctx.beginPath(); ctx.arc(75 + sx, -54, 6, 0, Math.PI, true); ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(w * 0.5, h * 0.7);
    ctx.strokeStyle = 'rgba(240,165,0,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-100, 0); ctx.quadraticCurveTo(0, -20, 100, 0); ctx.stroke();
    ctx.strokeStyle = 'rgba(240,165,0,0.04)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([5, 8]);
    ctx.beginPath(); ctx.moveTo(-100, 3); ctx.quadraticCurveTo(0, -17, 100, 3); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    if (w >= 480) {
      ctx.save();
      ctx.translate(w * 0.75, h * 0.6);
      ctx.strokeStyle = 'rgba(240,165,0,0.1)';
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -25); ctx.lineTo(60, -25); ctx.lineTo(60, 0); ctx.stroke();
      ctx.strokeStyle = 'rgba(240,165,0,0.06)';
      ctx.lineWidth = 0.3;
      for (var i = 0; i < 60; i += 10) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, -25); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 5, -25); ctx.stroke();
      }
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// === PRELOADER: auto-dismiss ===
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = '';
  }, 2600);
});

// === HERO ENGINEERING CANVAS ===
(function() {
  var canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w, h, frame = 0;
  var scanX = 0;
  var traffic = [];

  function resize() {
    var parent = canvas.parentElement;
    w = canvas.width = parent.offsetWidth;
    h = canvas.height = parent.offsetHeight;
    initTraffic();
  }

  function initTraffic() {
    var count = w < 768 ? 6 : 20;
    traffic = [];
    for (var i = 0; i < count; i++) {
      traffic.push({
        t: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        offset: Math.random() * 3 - 1.5
      });
    }
  }

  resize();
  window.addEventListener('resize', resize);

  // === DRAWING FUNCTIONS ===

  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = 'rgba(240,165,0,0.035)';
    ctx.lineWidth = 0.5;
    var step = 60;
    for (var x = 0; x < w; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (var y = 0; y < h; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    // Bold axis lines
    ctx.strokeStyle = 'rgba(240,165,0,0.06)';
    ctx.lineWidth = 1;
    var cx = Math.floor(w / 2 / step) * step;
    var cy = Math.floor(h / 2 / step) * step;
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
    ctx.restore();
  }

  function drawDimensionMark(x, y, len, angle) {
    ctx.save();
    ctx.strokeStyle = 'rgba(240,165,0,0.08)';
    ctx.lineWidth = 0.5;
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len, 0);
    ctx.stroke();
    // Arrow ticks
    ctx.beginPath();
    ctx.moveTo(2, -3);
    ctx.lineTo(0, 0);
    ctx.lineTo(2, 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(len - 2, -3);
    ctx.lineTo(len, 0);
    ctx.lineTo(len - 2, 3);
    ctx.stroke();
    ctx.restore();
  }

  function drawCrane(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    var mastH = 280, boomW = 220, counterW = 70;
    var col = 'rgba(240,165,0,';

    // Mast (tower)
    ctx.strokeStyle = col + '0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(-8, -mastH);
    ctx.lineTo(8, -mastH);
    ctx.lineTo(8, 0);
    ctx.stroke();

    // Cross-bracing on mast
    ctx.strokeStyle = col + '0.15)';
    ctx.lineWidth = 0.5;
    for (var i = 0; i < mastH; i += 20) {
      ctx.beginPath();
      ctx.moveTo(-8, -i);
      ctx.lineTo(8, -i - 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(8, -i);
      ctx.lineTo(-8, -i - 10);
      ctx.stroke();
    }

    // Top cap
    ctx.fillStyle = col + '0.2)';
    ctx.fillRect(-12, -mastH, 24, 4);

    // Boom (jib) - extending right
    ctx.strokeStyle = col + '0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, -mastH - 2);
    ctx.lineTo(boomW, -mastH - 2);
    ctx.stroke();

    // Boom lattice (top)
    ctx.strokeStyle = col + '0.1)';
    ctx.lineWidth = 0.5;
    for (var b = 0; b < boomW; b += 15) {
      ctx.beginPath();
      ctx.moveTo(b, -mastH - 2);
      ctx.lineTo(b + 7, -mastH - 10);
      ctx.stroke();
    }
    // Boom bottom chord
    ctx.strokeStyle = col + '0.2)';
    ctx.beginPath();
    ctx.moveTo(0, -mastH - 10);
    ctx.lineTo(boomW - 10, -mastH - 10);
    ctx.stroke();

    // Counter-jib (left)
    ctx.strokeStyle = col + '0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -mastH - 2);
    ctx.lineTo(-counterW, -mastH - 2);
    ctx.stroke();
    // Cross lines
    ctx.strokeStyle = col + '0.1)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-counterW, -mastH - 2);
    ctx.lineTo(0, -mastH - 14);
    ctx.stroke();

    // Cables from boom to hook
    var hookPendulum = Math.sin(frame * 0.003) * 3;
    var hookX = boomW * 0.7 + hookPendulum;
    var hookY = 60;
    ctx.strokeStyle = col + '0.12)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(boomW * 0.3, -mastH - 2);
    ctx.lineTo(hookX, hookY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(boomW * 0.7, -mastH - 2);
    ctx.lineTo(hookX, hookY);
    ctx.stroke();

    // Hook
    ctx.strokeStyle = col + '0.3)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(hookX, hookY + 6, 6, 0, Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(hookX, hookY);
    ctx.lineTo(hookX, hookY + 12);
    ctx.stroke();

    // Glow node at tip
    ctx.shadowColor = 'rgba(240,165,0,0.5)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = col + '0.5)';
    ctx.beginPath();
    ctx.arc(hookX, hookY + 6, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  function drawBridgeTruss(cx, cy, span, hScale) {
    ctx.save();
    ctx.translate(cx, cy);
    var h = 60 * hScale;
    var segments = 12;
    var segW = span / segments;

    ctx.strokeStyle = 'rgba(240,165,0,0.25)';
    ctx.lineWidth = 1.2;

    // Top chord
    ctx.beginPath();
    ctx.moveTo(0, -h);
    ctx.lineTo(span, -h);
    ctx.stroke();

    // Bottom chord
    ctx.strokeStyle = 'rgba(240,165,0,0.2)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(span, 0);
    ctx.stroke();

    // Truss triangles
    ctx.strokeStyle = 'rgba(240,165,0,0.12)';
    ctx.lineWidth = 0.6;
    for (var i = 0; i <= segments; i++) {
      var sx = i * segW;
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, -h);
      ctx.stroke();
    }
    for (var i = 0; i < segments; i++) {
      var sx = i * segW;
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx + segW / 2, -h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(sx + segW / 2, -h);
      ctx.lineTo(sx + segW, 0);
      ctx.stroke();
    }

    // Supports at ends
    ctx.strokeStyle = 'rgba(240,165,0,0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(5, 40);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(span - 5, 0);
    ctx.lineTo(span - 5, 40);
    ctx.stroke();

    // Bottom base plates
    ctx.fillStyle = 'rgba(240,165,0,0.1)';
    ctx.fillRect(0, 40, 12, 3);
    ctx.fillRect(span - 12, 40, 12, 3);

    // Glow nodes at joints
    ctx.shadowColor = 'rgba(240,165,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = 'rgba(240,165,0,0.3)';
    for (var i = 0; i <= segments; i++) {
      ctx.beginPath();
      ctx.arc(i * segW, 0, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(i * segW, -h, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  function drawHighway() {
    ctx.save();
    // Sweeping highway curve
    var pts = [];
    var cp = [
      { x: w * 0.05, y: h * 0.85 },
      { x: w * 0.2, y: h * 0.7 },
      { x: w * 0.45, y: h * 0.55 },
      { x: w * 0.7, y: h * 0.5 },
      { x: w * 0.92, y: h * 0.45 }
    ];

    var col = 'rgba(240,165,0,';

    // Road deck shadow
    ctx.strokeStyle = col + '0.04)';
    ctx.lineWidth = 24;
    ctx.shadowColor = 'rgba(240,165,0,0.05)';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(cp[0].x, cp[0].y);
    for (var t = 0; t <= 1; t += 0.02) {
      var px = catmullRom(cp, t, 'x');
      var py = catmullRom(cp, t, 'y');
      ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Road edges
    ctx.strokeStyle = col + '0.18)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cp[0].x, cp[0].y);
    for (var t = 0; t <= 1; t += 0.02) {
      ctx.lineTo(catmullRom(cp, t, 'x'), catmullRom(cp, t, 'y'));
    }
    ctx.stroke();

    // Road centerline (dashed)
    ctx.strokeStyle = col + '0.08)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([8, 12]);
    ctx.lineDashOffset = -frame * 0.3;
    ctx.beginPath();
    for (var t = 0; t <= 1; t += 0.01) {
      var cx = catmullRom(cp, t, 'x');
      var cy = catmullRom(cp, t, 'y') + 2;
      if (t === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Pillars
    ctx.strokeStyle = col + '0.1)';
    ctx.lineWidth = 2;
    var pillarPositions = [0.15, 0.3, 0.45, 0.6, 0.75, 0.9];
    for (var p = 0; p < pillarPositions.length; p++) {
      var t = pillarPositions[p];
      var px = catmullRom(cp, t, 'x');
      var py = catmullRom(cp, t, 'y') + 12;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, h);
      ctx.stroke();
    }

    // Pillar highlights
    ctx.fillStyle = col + '0.05)';
    for (var p = 0; p < pillarPositions.length; p++) {
      var t = pillarPositions[p];
      var px = catmullRom(cp, t, 'x');
      var py = catmullRom(cp, t, 'y') + 12;
      ctx.fillRect(px - 3, py, 6, h - py);
    }

    ctx.restore();
    return cp;
  }

  function catmullRom(pts, t, prop) {
    var n = pts.length - 1;
    var i = Math.floor(t * n);
    var f = (t * n) - i;
    if (i >= n) { i = n - 1; f = 1; }
    var p0 = pts[Math.max(0, i - 1)];
    var p1 = pts[i];
    var p2 = pts[Math.min(n, i + 1)];
    var p3 = pts[Math.min(n, i + 2)];
    var v0 = p0 ? p0[prop] : p1[prop];
    var v1 = p1[prop];
    var v2 = p2[prop];
    var v3 = p3 ? p3[prop] : p2[prop];
    var f2 = f * f;
    var f3 = f2 * f;
    return 0.5 * ((2 * v1) + (-v0 + v2) * f + (2 * v0 - 5 * v1 + 4 * v2 - v3) * f2 + (-v0 + 3 * v1 - 3 * v2 + v3) * f3);
  }

  function drawTraffic(controlPts) {
    if (!controlPts || controlPts.length < 2) return;
    ctx.save();
    for (var i = 0; i < traffic.length; i++) {
      var t = traffic[i];
      t.t += t.speed;
      if (t.t > 1) t.t = 0;
      var px = catmullRom(controlPts, t.t, 'x');
      var py = catmullRom(controlPts, t.t, 'y') + t.offset;
      var size = 1.5 + Math.random() * 0.5;
      ctx.shadowColor = 'rgba(240,165,0,0.6)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = 'rgba(240,165,0,0.4)';
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }

  function drawSkywalk(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    var col = 'rgba(240,165,0,';
    var deckW = 140, deckH = 6, pillarH = 50;

    // Pillars
    ctx.strokeStyle = col + '0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(10, pillarH);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(deckW - 10, 0);
    ctx.lineTo(deckW - 10, pillarH);
    ctx.stroke();

    // Base plates
    ctx.fillStyle = col + '0.08)';
    ctx.fillRect(4, pillarH, 12, 3);
    ctx.fillRect(deckW - 16, pillarH, 12, 3);

    // Deck
    ctx.fillStyle = col + '0.12)';
    ctx.fillRect(0, -deckH, deckW, deckH);

    // Deck edge lines
    ctx.strokeStyle = col + '0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -deckH);
    ctx.lineTo(deckW, -deckH);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(deckW, 0);
    ctx.stroke();

    // Glass railing (vertical lines)
    ctx.strokeStyle = col + '0.06)';
    ctx.lineWidth = 0.3;
    for (var i = 5; i < deckW; i += 6) {
      ctx.beginPath();
      ctx.moveTo(i, -deckH - 10);
      ctx.lineTo(i, -deckH);
      ctx.stroke();
    }

    // Top rail
    ctx.strokeStyle = col + '0.15)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, -deckH - 10);
    ctx.lineTo(deckW, -deckH - 10);
    ctx.stroke();

    // Roof structure
    ctx.strokeStyle = col + '0.1)';
    ctx.lineWidth = 0.6;
    var roofH = 14;
    ctx.beginPath();
    ctx.moveTo(5, -deckH - 10);
    ctx.lineTo(deckW / 2, -deckH - 10 - roofH);
    ctx.lineTo(deckW - 5, -deckH - 10);
    ctx.stroke();

    // Cross braces
    ctx.strokeStyle = col + '0.06)';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(deckW / 2, -deckH - 10 - roofH);
    ctx.lineTo(deckW / 2, -deckH - 10);
    ctx.stroke();

    // Stairs
    ctx.strokeStyle = col + '0.08)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-16, 0);
    ctx.lineTo(-16, 30);
    ctx.lineTo(-4, 30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(deckW + 4, 0);
    ctx.lineTo(deckW + 4, 30);
    ctx.lineTo(deckW + 16, 30);
    ctx.stroke();

    ctx.restore();
  }

  function drawBuildings() {
    ctx.save();
    var col = 'rgba(240,165,0,';
    var buildings = [
      { x: w * 0.7, y: h * 0.4, bw: 50, bh: 80 },
      { x: w * 0.73, y: h * 0.35, bw: 35, bh: 100 },
      { x: w * 0.78, y: h * 0.42, bw: 55, bh: 70 },
      { x: w * 0.83, y: h * 0.38, bw: 40, bh: 90 },
      { x: w * 0.88, y: h * 0.44, bw: 45, bh: 65 },
      { x: w * 0.92, y: h * 0.4, bw: 30, bh: 85 }
    ];

    for (var i = 0; i < buildings.length; i++) {
      var b = buildings[i];
      ctx.strokeStyle = col + '0.08)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(b.x, b.y, b.bw, b.bh);

      // Windows (grid)
      ctx.strokeStyle = col + '0.04)';
      ctx.lineWidth = 0.3;
      for (var wy = b.y + 6; wy < b.y + b.bh - 6; wy += 8) {
        for (var wx = b.x + 4; wx < b.x + b.bw - 4; wx += 7) {
          ctx.strokeRect(wx, wy, 4, 5);
        }
      }
    }

    ctx.restore();
  }

  function drawAnnotation(x, y, text, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle || 0);
    ctx.fillStyle = 'rgba(240,165,0,0.08)';
    ctx.font = '9px "Inter", monospace';
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  function drawScanLine() {
    scanX += 0.3;
    if (scanX > w) scanX = -100;

    ctx.save();
    var grad = ctx.createLinearGradient(scanX - 40, 0, scanX + 40, 0);
    grad.addColorStop(0, 'rgba(240,165,0,0)');
    grad.addColorStop(0.5, 'rgba(240,165,0,0.06)');
    grad.addColorStop(1, 'rgba(240,165,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(scanX - 40, 0, 80, h);

    // Center glow line
    ctx.strokeStyle = 'rgba(240,165,0,0.15)';
    ctx.lineWidth = 1;
    ctx.shadowColor = 'rgba(240,165,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(scanX, 0);
    ctx.lineTo(scanX, h);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  // === NEW CONSTRUCTION ELEMENTS ===

  function drawBeamDetail(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    var col = 'rgba(240,165,0,';
    var bw = 60, fw = 12, fh = 8, tw = 10;

    // I-beam section
    ctx.strokeStyle = col + '0.25)';
    ctx.lineWidth = 1.2;

    // Top flange
    ctx.fillStyle = col + '0.06)';
    ctx.fillRect(-bw/2, -fh, bw, fh);
    ctx.strokeRect(-bw/2, -fh, bw, fh);

    // Bottom flange
    ctx.fillRect(-bw/2, fh/2, bw, fh);
    ctx.strokeRect(-bw/2, fh/2, bw, fh);

    // Web
    ctx.fillRect(-fw/2, -fh, fw, fh/2 + fh);
    ctx.strokeRect(-fw/2, -fh, fw, fh/2 + fh);

    // Center axis line
    ctx.strokeStyle = col + '0.08)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(0, -fh - 12);
    ctx.lineTo(0, fh/2 + fh + 12);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dimension lines
    ctx.strokeStyle = col + '0.1)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-bw/2 - 10, -fh);
    ctx.lineTo(-bw/2 - 10, fh/2 + fh);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-bw/2 - 14, -fh);
    ctx.lineTo(-bw/2 - 6, -fh);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-bw/2 - 14, fh/2 + fh);
    ctx.lineTo(-bw/2 - 6, fh/2 + fh);
    ctx.stroke();

    // Label
    ctx.fillStyle = col + '0.12)';
    ctx.font = '7px monospace';
    ctx.fillText('ISMB 600', -bw/2 - 8, fh + 28);

    ctx.restore();
  }

  function drawExcavator(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    var col = 'rgba(240,165,0,';

    // Tracks
    ctx.strokeStyle = col + '0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-24, 0);
    ctx.lineTo(18, 0);
    ctx.lineTo(20, 8);
    ctx.lineTo(-22, 8);
    ctx.closePath();
    ctx.stroke();

    // Track details
    ctx.strokeStyle = col + '0.08)';
    ctx.lineWidth = 0.3;
    for (var i = -22; i < 20; i += 3) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 8);
      ctx.stroke();
    }

    // Cabin
    ctx.strokeStyle = col + '0.25)';
    ctx.lineWidth = 1;
    ctx.fillStyle = col + '0.04)';
    ctx.fillRect(-8, -18, 20, 18);
    ctx.strokeRect(-8, -18, 20, 18);

    // Cabin window
    ctx.strokeStyle = col + '0.1)';
    ctx.strokeRect(-4, -15, 12, 8);

    // Boom arm
    ctx.strokeStyle = col + '0.2)';
    ctx.lineWidth = 1.2;
    var boomAngle = Math.sin(frame * 0.008) * 0.1 - 0.6;
    var armAngle = Math.sin(frame * 0.006 + 1) * 0.15 - 0.8;
    var bx = 10, by = -12;
    var bLen = 24;
    var ex = bx + Math.cos(boomAngle) * bLen;
    var ey = by + Math.sin(boomAngle) * bLen;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    // Arm
    var aLen = 20;
    var hx = ex + Math.cos(armAngle) * aLen;
    var hy = ey + Math.sin(armAngle) * aLen;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(hx, hy);
    ctx.stroke();

    // Bucket
    ctx.strokeStyle = col + '0.15)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    ctx.lineTo(hx - 4, hy + 8);
    ctx.lineTo(hx + 4, hy + 10);
    ctx.lineTo(hx + 2, hy + 2);
    ctx.closePath();
    ctx.stroke();

    // Joint circles
    ctx.fillStyle = col + '0.2)';
    ctx.beginPath(); ctx.arc(bx, by, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(ex, ey, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(hx, hy, 1.5, 0, Math.PI * 2); ctx.fill();

    // Label
    ctx.fillStyle = col + '0.08)';
    ctx.font = '6px monospace';
    ctx.fillText('EXCAVATOR', -16, -24);

    ctx.restore();
  }

  function drawScaffolding(x, y, w, h) {
    ctx.save();
    ctx.translate(x, y);
    var col = 'rgba(240,165,0,';
    var verts = [0, w];
    var horzs = [];

    for (var i = 0; i <= h; i += 12) horzs.push(i);

    // Vertical standards
    ctx.strokeStyle = col + '0.12)';
    ctx.lineWidth = 0.6;
    for (var v = 0; v < verts.length; v++) {
      ctx.beginPath();
      ctx.moveTo(verts[v], 0);
      ctx.lineTo(verts[v], h);
      ctx.stroke();
    }

    // Horizontal ledgers
    ctx.strokeStyle = col + '0.08)';
    ctx.lineWidth = 0.4;
    for (var hz = 0; hz < horzs.length; hz++) {
      ctx.beginPath();
      ctx.moveTo(0, horzs[hz]);
      ctx.lineTo(w, horzs[hz]);
      ctx.stroke();
    }

    // Diagonal braces
    ctx.strokeStyle = col + '0.04)';
    ctx.lineWidth = 0.3;
    for (var d = 0; d < h; d += 24) {
      ctx.beginPath();
      ctx.moveTo(0, d);
      ctx.lineTo(w, d + 12);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w, d);
      ctx.lineTo(0, d + 12);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawSectionCut(x, y, len) {
    ctx.save();
    ctx.translate(x, y);
    var col = 'rgba(240,165,0,';

    // Cut line
    ctx.strokeStyle = col + '0.15)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len, 0);
    ctx.stroke();
    ctx.setLineDash([]);

    // Arrows at ends
    ctx.fillStyle = col + '0.2)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(8, -4);
    ctx.lineTo(8, 4);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(len, 0);
    ctx.lineTo(len - 8, -4);
    ctx.lineTo(len - 8, 4);
    ctx.closePath();
    ctx.fill();

    // Labels
    ctx.fillStyle = col + '0.12)';
    ctx.font = '8px monospace';
    ctx.fillText('A', -8, -6);
    ctx.fillText("A'", len + 2, -6);

    ctx.restore();
  }

  function drawRebarDetail(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    var col = 'rgba(240,165,0,';
    var r = 24;

    // Concrete outline
    ctx.strokeStyle = col + '0.08)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(-r, -r, r * 2, r * 2);

    // Stirrup
    ctx.strokeStyle = col + '0.15)';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(-r + 5, -r + 5, r * 2 - 10, r * 2 - 10);

    // Main rebars (circles with dots)
    ctx.strokeStyle = col + '0.2)';
    ctx.fillStyle = col + '0.2)';
    var barPositions = [
      [-r + 5, -r + 5], [r - 5, -r + 5],
      [-r + 5, r - 5], [r - 5, r - 5],
      [0, -r + 5], [0, r - 5]
    ];
    for (var i = 0; i < barPositions.length; i++) {
      var bp = barPositions[i];
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bp[0], bp[1], 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = col + '0.15)';
      ctx.beginPath();
      ctx.arc(bp[0], bp[1], 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Label
    ctx.fillStyle = col + '0.1)';
    ctx.font = '6px monospace';
    ctx.fillText('REBAR SCHEDULE', -r - 2, r + 14);
    ctx.fillText('4-#25 T&B', -r - 2, r + 22);

    ctx.restore();
  }

  // === MAIN DRAW LOOP ===
  var controlPts = null;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    frame++;
    var mobile = w < 768;

    drawGrid();

    if (!mobile) {
      drawBuildings();
      drawDimensionMark(w * 0.05, h * 0.9, 200, 0);
      drawDimensionMark(w * 0.85, h * 0.1, -120, 0);
      drawBridgeTruss(w * 0.82, h * 0.55, Math.min(180, w * 0.25), 1);
      drawScaffolding(w * 0.94, h * 0.35, 40, 120);
      drawBeamDetail(w * 0.92, h * 0.18, 0.7);
      drawRebarDetail(w * 0.06, h * 0.65, 0.8);
      drawSectionCut(w * 0.25, h * 0.28, 120);
      drawExcavator(w * 0.75, h * 0.88, 1);
    }

    drawCrane(mobile ? w * 0.15 : w * 0.12, h * 0.9, mobile ? 0.5 : 1);

    controlPts = drawHighway();
    drawTraffic(controlPts);

    drawSkywalk(mobile ? w * 0.3 : w * 0.38, h * 0.8, mobile ? 0.6 : 1);

    if (!mobile) drawScanLine();

    drawAnnotation(mobile ? 10 : 20, 20, mobile ? 'KV CONSTRUCTIONS' : 'KV CONSTRUCTIONS — CIVIL ENGINEERING DRAWING', 0);
    if (!mobile) {
      drawAnnotation(20, 34, 'SCALE: NTS | DATE: 2026 | SHEET: 01', 0);
      drawAnnotation(w - 180, 20, 'PROJECT: VARIOUS | STATUS: ACTIVE', 0);
    }

    requestAnimationFrame(draw);
  }

  draw();
})();

// === NAVBAR ===
(function() {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// === ACTIVE NAV ===
(function() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function() {
    var current = '';
    sections.forEach(function(s) {
      if (window.scrollY >= s.offsetTop - 250) current = s.id;
    });
    navLinks.forEach(function(l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });
})();

// === MOBILE MENU ===
(function() {
  var ham = document.getElementById('hamburger');
  var nav = document.getElementById('navLinks');
  ham.addEventListener('click', function() {
    nav.classList.toggle('open');
    ham.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(function(l) {
    l.addEventListener('click', function() {
      nav.classList.remove('open');
      ham.classList.remove('open');
    });
  });
})();

// === SCROLL REVEAL ===
(function() {
  var els = document.querySelectorAll('.reveal');
  function check() {
    var wh = window.innerHeight;
    els.forEach(function(el) {
      if (el.getBoundingClientRect().top < wh - 80) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', check);
  window.addEventListener('resize', check);
  check();
})();

// === COUNTERS ===
(function() {
  var counters = document.querySelectorAll('.stat-num[data-count]');
  function start(el) {
    var target = parseInt(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var cur = 0;
    var step = Math.ceil(target / 50);
    function upd() {
      cur += step;
      if (cur >= target) { el.textContent = target + suffix; return; }
      el.textContent = cur + suffix;
      requestAnimationFrame(upd);
    }
    upd();
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        start(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function(c) { obs.observe(c); });
})();

// === CONTACT FORM ===
(function() {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('button');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(function() {
      btn.textContent = 'Sent Successfully';
      btn.style.background = '#2ecc71';
      setTimeout(function() {
        form.reset();
        btn.textContent = 'Send Enquiry';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
})();

// === LIGHTBOX ===
var lightboxItems = [
  { src: 'images/NH69.png', caption: 'NH-69 — Obedullaganj-Betul Highway, BOT (INR 870 Cr)' },
  { src: 'images/NH48.png', caption: 'NH-48 — Nelamangala-Devihalli Expressway, BOT (INR 550 Cr)' },
  { src: 'images/NH205.png', caption: 'NH-205 — Tirupathi-Chennai Highway, DBFOT (INR 540 Cr)' },
  { src: '', caption: 'Bhopal Bypass — 52 km Four Laning, DBFOT (INR 276 Cr)' },
  { src: '', caption: 'SH-31 — Cuddapah-Renigunta Highway, World Bank (INR 120 Cr)' },
  { src: '', caption: '275m RCC Chimney, Ukai — Gujarat' }
];
var lightboxIndex = 0;

function openLightbox(src, caption) {
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lightboxImg');
  var cap = document.getElementById('lightboxCaption');

  // Find index
  if (src) {
    for (var i = 0; i < lightboxItems.length; i++) {
      if (lightboxItems[i].src === src) { lightboxIndex = i; break; }
    }
  } else {
    // If no image, find by caption
    lightboxIndex = -1;
  }

  if (lightboxIndex >= 0) {
    img.src = lightboxItems[lightboxIndex].src;
    cap.textContent = lightboxItems[lightboxIndex].caption;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
    cap.textContent = caption;
  }

  lb.classList.add('open');
document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function nextLightbox(e) {
  e.stopPropagation();
  if (lightboxIndex < 0) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
  var img = document.getElementById('lightboxImg');
  var cap = document.getElementById('lightboxCaption');
  img.src = lightboxItems[lightboxIndex].src;
  cap.textContent = lightboxItems[lightboxIndex].caption;
  img.style.display = lightboxItems[lightboxIndex].src ? 'block' : 'none';
}

function prevLightbox(e) {
  e.stopPropagation();
  if (lightboxIndex < 0) return;
  lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
  var img = document.getElementById('lightboxImg');
  var cap = document.getElementById('lightboxCaption');
  img.src = lightboxItems[lightboxIndex].src;
  cap.textContent = lightboxItems[lightboxIndex].caption;
  img.style.display = lightboxItems[lightboxIndex].src ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-next').addEventListener('click', nextLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', prevLightbox);
  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox(e);
    if (e.key === 'ArrowLeft') prevLightbox(e);
  });
});



// === RIBBON SCROLL ===
(function() {
  var ribbon = document.getElementById('ribbon');
  if (!ribbon) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > window.innerHeight * 0.8) {
      ribbon.classList.add('visible');
    } else {
      ribbon.classList.remove('visible');
    }
  });
})();

// === CTA FLOAT ===
(function() {
  var cta = document.getElementById('ctaFloat');
  if (!cta) return;
  cta.addEventListener('click', function() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
})();

// === PARALLAX CANVAS ===
(function() {
  var canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  window.addEventListener('scroll', function() {
    if (window.innerWidth < 768) return;
    canvas.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
  });
})();

// === STAGGERED REVEAL ===
(function() {
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var siblings = el.parentElement.querySelectorAll('.reveal');
        var index = Array.prototype.indexOf.call(siblings, el);
        el.style.transitionDelay = (index * 0.1) + 's';
        el.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(function(r) { observer.observe(r); });
})();

// === CMS PROJECTS LOADER ===
(function() {
  var container = document.getElementById('cmsProjects');
  if (!container) return;

  fetch('content/projects.json?' + Date.now())
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data || !data.list || !data.list.length) {
        container.innerHTML = '<div class="p-loading">No projects added yet. <a href="/admin/" style="color:#f0a500">Add via CMS →</a></div>';
        return;
      }
      container.innerHTML = '';
      data.list.forEach(function(p, i) {
        var card = document.createElement('div');
        card.className = 'p-card';
        card.setAttribute('data-index', i);

        var imgSrc = '';
        if (p.photos && p.photos.length > 0) {
          var raw = typeof p.photos[0] === 'string' ? p.photos[0] : p.photos[0].photo;
          if (raw) imgSrc = raw;
        }

        var head = document.createElement('div');
        head.className = 'p-card-head';
        if (imgSrc) {
          head.style.backgroundImage = 'url("' + imgSrc + '")';
        } else {
          head.style.background = 'linear-gradient(135deg,' + (i % 2 === 0 ? '#1a1a2e,#b83b3b' : '#2c3e50,#34495e') + ')';
        }

        var pVal = p.value ? ' — ' + p.value : '';
        var cardCaption = p.title + pVal + (p.location ? ' (' + p.location + ')' : '');

        card.addEventListener('click', function() {
          var images = p.photos || [];
          var imgUrl = '';
          if (images.length > 0) {
            imgUrl = typeof images[0] === 'string' ? images[0] : (images[0].photo || '');
          }
          openLightbox(imgUrl, cardCaption);
        });

        var body = document.createElement('div');
        body.className = 'p-card-body';
        body.innerHTML = '<h4>' + p.title + '</h4><p>' + (p.location || '') + (pVal ? pVal : '') + '</p>';

        card.appendChild(head);
        card.appendChild(body);
        container.appendChild(card);
      });
    })
    .catch(function() {
      container.innerHTML = '<div class="p-loading">Could not load projects.</div>';
    });
})();
