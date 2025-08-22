import json
import boto3
from decimal import Decimal

# Cliente de DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('steens-usuarios')

def lambda_handler(event, context):
    """
    Función Lambda para procesar resultados del test de habilidades
    y generar feedback personalizado con IA
    """
    
    try:
        body = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
        
        user_id = body.get('user_id')
        respuestas = body.get('respuestas', [])
        
        if not user_id or not respuestas:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                },
                'body': json.dumps({'error': 'user_id y respuestas requeridos'})
            }
        
        # Calcular puntaje
        correctas = sum(1 for r in respuestas if r.get('correcta', False))
        total = len(respuestas)
        porcentaje = (correctas / total) * 100 if total > 0 else 0
        
        # Generar feedback personalizado
        feedback = generar_feedback_personalizado(porcentaje, correctas)
        
        # Determinar medalla
        medalla = determinar_medalla(porcentaje)
        
        # Actualizar usuario en DynamoDB
        try:
            response = table.update_item(
                Key={'user_id': user_id},
                UpdateExpression='ADD puntos :puntos SET medallas = list_append(if_not_exists(medallas, :empty_list), :medalla)',
                ExpressionAttributeValues={
                    ':puntos': Decimal(correctas * 10),
                    ':medalla': [medalla],
                    ':empty_list': []
                },
                ReturnValues='UPDATED_NEW'
            )
        except Exception as db_error:
            print(f"Error actualizando DynamoDB: {db_error}")
            # Continuar sin fallar si hay error en DB
        
        resultado = {
            'correctas': correctas,
            'total': total,
            'porcentaje': porcentaje,
            'feedback': feedback,
            'medalla': medalla,
            'puntos_ganados': correctas * 10
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

def generar_feedback_personalizado(porcentaje, correctas):
    """
    Genera feedback personalizado basado en el rendimiento
    """
    
    referentes = [
        {
            'nombre': 'Mariana Costa',
            'area': 'Tecnología',
            'logro': 'fundadora de Laboratoria',
            'frase': 'La tecnología puede transformar vidas cuando es inclusiva'
        },
        {
            'nombre': 'Fabiola León-Velarde',
            'area': 'Medicina',
            'logro': 'primera mujer rectora de la UPCH',
            'frase': 'La ciencia no tiene género, solo requiere pasión y dedicación'
        },
        {
            'nombre': 'Antonieta Alva',
            'area': 'Economía',
            'logro': 'ex Ministra de Economía',
            'frase': 'Los números cuentan historias que pueden cambiar el mundo'
        }
    ]
    
    if porcentaje >= 80:
        recomendacion = 'Excelente! Tienes habilidades sobresalientes en lógica y pensamiento computacional. Te sugerimos explorar Ingeniería de Software o Ciencias de la Computación.'
        referente = referentes[0]
    elif porcentaje >= 60:
        recomendacion = 'Muy bien! Muestras buen razonamiento analítico. Podrías destacar en Ingeniería Industrial o Matemáticas Aplicadas.'
        referente = referentes[2]
    else:
        recomendacion = 'Buen inicio! Tienes potencial para desarrollar. Te recomendamos explorar áreas como Biología o Medicina donde puedes aplicar la lógica de manera práctica.'
        referente = referentes[1]
    
    feedback = f"{recomendacion}\n\nAl igual que {referente['nombre']}, {referente['logro']}, quien dice: \"{referente['frase']}\". ¡Tú también puedes lograr grandes cosas en STEM!"
    
    return feedback

def determinar_medalla(porcentaje):
    """
    Determina qué medalla otorgar basada en el porcentaje
    """
    
    if porcentaje >= 80:
        return '🏅 Genia en Lógica'
    elif porcentaje >= 60:
        return '🔢 Pensadora Analítica'
    else:
        return '🌱 Curiosidad Infinita'