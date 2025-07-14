// Definición de la malla (completa)
const ramos = [
  { id:"estrategias", nombre:"Estrategias para el aprendizaje", semestre:1, abre:[] },
  { id:"antropologia", nombre:"Antropología", semestre:1, abre:["etica"] },
  { id:"fund_biolog", nombre:"Fundamentos biológicos del comportamiento", semestre:1, abre:["neuropsicologia"] },
  { id:"procesos_cognitivos", nombre:"Procesos cognitivos", semestre:1, abre:["psicologia_evolutiva","psicologia_personalidad"] },
  { id:"evol_hist_psico", nombre:"Evolución histórica de la psicología", semestre:1, abre:["teor_psico1","teor_psico2"] },
  { id:"fund_filosof_psico", nombre:"Fundamentos filosóficos de la psicología", semestre:1, abre:[] },
  { id:"taller_comunicacion", nombre:"Taller de comunicación", semestre:1, abre:[] },

  { id:"etica", nombre:"Ética", semestre:2, abre:["electivo_formacion_integral_I"], requisitos:["antropologia"] },
  { id:"neuropsicologia", nombre:"Neuropsicología", semestre:2, abre:["eval_cognitiva"], requisitos:["fund_biolog"] },
  { id:"procesos_afectivos", nombre:"Procesos afectivos", semestre:2, abre:["psicologia_evolutiva","psicologia_personalidad"] },
  { id:"fund_socioantrop", nombre:"Fundamentos socioantropológicos del comportamiento", semestre:2, abre:[] },
  { id:"intro_metodologia", nombre:"Introducción a la metodología de la investigación", semestre:2, abre:["metod_aplicada"], requisitos:[] },
  { id:"taller_trab_grupal", nombre:"Taller de trabajo grupal", semestre:2, abre:[] },

  // ... aquí agregas semestres 3 a 10 siguiendo el mismo modelo ...
];

// Crear mapa por id
const mapa = new Map(ramos.map(c => [c.id, { ...c, aprobado:false }]));

const cont = document.getElementById('malla-container');

mapa.forEach(curso => {
  const div = document.createElement('div');
  div.className = 'curso';
  div.id = curso.id;
  div.innerHTML = `
    <strong>${curso.nombre}</strong>
    <div>Semestre ${curso.semestre}</div>
    <button ${curso.requisitos && curso.requisitos.some(r => !mapa.get(r).aprobado) ? 'disabled' : ''}>
      Aprobar
    </button>
  `;
  cont.appendChild(div);

  const btn = div.querySelector('button');
  btn.addEventListener('click', () => {
    curso.aprobado = true;
    div.classList.add('aprobado');
    btn.disabled = true;
    desbloquear();
  });
});

function desbloquear() {
  mapa.forEach(curso => {
    const div = document.getElementById(curso.id);
    const btn = div.querySelector('button');
    if (curso.requisitos) {
      const ready = curso.requisitos.every(r => mapa.get(r).aprobado);
      if (ready) btn.disabled = false;
    }
  });
}

