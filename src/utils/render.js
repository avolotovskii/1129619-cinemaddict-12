const RenderPosition = {
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTEREND:
      container.after(element.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(element.getElement());
      break;
  }
};

const openPopup = (container, component) => {
  container.appendChild(component.getElement());
};

const closePopup = (container, component) => {
  container.removeChild(component.getElement());
};

const remove = (component) => {
  component.getElement().remove();
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {RenderPosition, createElement, render, remove, replace, closePopup, openPopup};
