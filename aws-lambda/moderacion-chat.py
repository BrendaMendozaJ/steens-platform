import json
import boto3
import re

# Cliente de Amazon Comprehend para detección de toxicidad
comprehend = boto3.client('comprehend', region_name='us-east-1')

def lambda_handler(event, context):
    """
    Función Lambda para moderar mensajes de chat usando Amazon Comprehend
    """
    
    try:
        # Obtener el mensaje del evento
        body = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
        mensaje = body.get('mensaje', '')
        
        if not mensaje:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                },
                'body': json.dumps({'error': 'Mensaje requerido'})
            }
        
        # Detectar toxicidad con Amazon Comprehend
        response = comprehend.detect_toxic_content(
            TextSegments=[
                {
                    'Text': mensaje
                }
            ],
            LanguageCode='es'
        )
        
        # Analizar resultados
        is_toxic = False
        toxic_labels = []
        
        for result in response['ResultList']:
            for label in result['Labels']:
                if label['Score'] > 0.7:  # Umbral de confianza
                    is_toxic = True
                    toxic_labels.append(label['Name'])
        
        # Verificar también sesgos de género específicos
        sesgo_genero = detectar_sesgo_genero(mensaje)
        
        resultado = {
            'bloqueado': is_toxic or sesgo_genero['detectado'],
            'razon': 'contenido tóxico detectado' if is_toxic else sesgo_genero['razon'],
            'labels': toxic_labels,
            'score_confianza': max([label['Score'] for result in response['ResultList'] for label in result['Labels']], default=0)
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps(resultado)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({'error': str(e)})
        }

def detectar_sesgo_genero(mensaje):
    """
    Detecta sesgos de género específicos en el mensaje
    """
    
    patrones_sesgo = [
        r'(no es para|difícil para|muy complicado para).*(chica|mujer|niña)',
        r'(las chicas|las mujeres).*(no pueden|no saben|son malas)',
        r'mejor dedícate a.*(cocina|casa|belleza)',
        r'(eres|estás).*(tonta|estúpida|inútil)',
        r'(matemáticas|programación|ingeniería).*(no es para mujeres|es de hombres)'
    ]
    
    mensaje_lower = mensaje.lower()
    
    for patron in patrones_sesgo:
        if re.search(patron, mensaje_lower):
            return {
                'detectado': True,
                'razon': 'sesgo de género detectado'
            }
    
    return {
        'detectado': False,
        'razon': ''
    }