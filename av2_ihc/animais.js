fetch('animais.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(animais => {
    const lista = document.getElementById('animal-list');
    animais.forEach(animal => {
      // Card container
      const div = document.createElement('div');
      div.className = 'relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl border border-green-100 dark:border-green-800';

      // Animal image
      const img = document.createElement('img');
      img.src = animal.imagens[0];
      img.alt = `${animal.nome}, ${animal.raca_pt}`;
      img.className = 'w-full h-56 object-cover object-center rounded-t-2xl border-b-4 border-green-200 dark:border-green-700';
      div.appendChild(img);

      // Card content
      const content = document.createElement('div');
      content.className = 'flex flex-col flex-1 p-4';

      // Name and breed badge
      const nameRow = document.createElement('div');
      nameRow.className = 'flex items-center justify-between mb-2';
      const h3 = document.createElement('h3');
      h3.className = 'text-xl font-bold text-green-900 dark:text-green-100';
      h3.textContent = animal.nome;
      const breed = document.createElement('span');
      breed.className = 'ml-2 px-2 py-1 rounded bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs font-semibold';
      breed.textContent = animal.raca_pt;
      nameRow.appendChild(h3);
      nameRow.appendChild(breed);
      content.appendChild(nameRow);

      // Age badge
      const age = document.createElement('span');
      age.className = 'inline-block mb-2 px-2 py-1 rounded bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 text-xs font-medium w-fit';
      age.textContent = `Idade: ${animal.idade} ano${animal.idade > 1 ? 's' : ''}`;
      content.appendChild(age);

      // Traits
      if (animal.tracos && animal.tracos.length > 0) {
        const traits = document.createElement('div');
        traits.className = 'flex flex-wrap gap-2 mb-2 mt-2';
        animal.tracos.forEach(traco => {
          const badge = document.createElement('span');
          badge.className = 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-medium border border-green-200 dark:border-green-700';
          badge.textContent = traco;
          traits.appendChild(badge);
        });
        content.appendChild(traits);
      }

      // Description (short)
      if (animal.descricao) {
        const desc = document.createElement('p');
        desc.className = 'text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3';
        desc.textContent = animal.descricao;
        content.appendChild(desc);
      }

      // Button
      const button = document.createElement('button');
      button.className = 'mt-auto bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 dark:hover:bg-green-400 transition w-full';
      button.textContent = 'Ver mais detalhes';
      button.addEventListener('click', () => {
        window.location.href = `detalhes.html?animal=${encodeURIComponent(animal.id)}`;
      });
      content.appendChild(button);

      div.appendChild(content);
      lista.appendChild(div);
    });
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });